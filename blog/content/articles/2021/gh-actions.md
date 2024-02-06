---
title: "Streamline Your GitHub Actions With Composite Actions"
publicationDate: 2021-09-16
medium: https://betterprogramming.pub/streamline-your-github-actions-with-composite-actions-a8ebc6d28f6b
---

# Streamline Your GitHub Actions With Composite Actions<!-- omit in toc -->

Make the most of GitHub Actions with caching actions and dependent jobs
supported by composite actions.

- [Why do we need dependent jobs?](#why-do-we-need-dependent-jobs)
- [How to use dependent jobs?](#how-to-use-dependent-jobs)
- [Caching dependencies](#caching-dependencies)
- [Keep code DRY: composite actions](#keep-code-dry-composite-actions)
  - [Set up the composite actions](#set-up-the-composite-actions)
  - [Matrix testing](#matrix-testing)
- [Real world conclusions](#real-world-conclusions)

GitHub blog published a post ([here][6]) unveiling composite actions to reduce
duplication. Who does not like to have a _DRY_ code? I gave a try with a real-world like situation
to see how much added value composite actions brings and its potential limitations.

This is also the opportunity to showcase two other GitHub actions concepts (that I now love):

- **Caching actions**: and to install dependencies only when necessary.
- **Dependent jobs**: to parallelize tasks and/or break down jobs with a finer
  granularity.

## Why do we need dependent jobs?

NodeJs projects have recurrent checks such as linting, building, and unit
testing. With GitHub actions, it is quite easy to set this up: create a workflow
where everything is contained in a single job:

```yml
# .github/workflows/code_checking.yaml

name: Code checking

# The standard use case would be executing those checks in a pull request
on: pull_request

jobs:
  checks:
    runs-on: ubuntu-latest

    # All steps are sequentially executed
    steps:
      - uses: actions/checkout@v2

      - name: Use Node.js 14
        uses: actions/setup-node@v2
        with:
          node-version: 14

      - name: Install dependencies
        run: npm install

      - name: Checking linting
        run: npm run lint

      - name: Checking build
        run: npm run build

      - name: Run unit testing
        run: npm run test
```

Some useful links:

- `actions/checkout` repository: https://github.com/actions/checkout
- `actions/setup-node` repository: https://github.com/actions/setup-node

This example works but can quickly encounters some limitations:

- **No check parallelization**: All steps being sequential, there is no
  possibility of parallelizing tasks
- **Not enough granularity**: If some checks are flagged as required to pass,
  in the GitHub branch protection rules, a finer granularity is necessary.
- **Matrix testing**: If some steps requires a matrix configuration, it will
  impact all steps when only few steps actually need the matrix configuration.

To address the points above, the steps need to be broken down in dedicated
jobs. For example:

```yaml
name: Code checking

on: pull_request

jobs:
  lint:
    # ...linting checks steps...

  build:
    # ...building checks steps...

  test:
    # ...unit testing steps...
```

All three jobs will be executed in parallel. This creates some redundancy as
linting, building and unit testing will all require dependencies to be installed. 

> Note: each job needs time to spin up so it makes sense to group some tasks
> together. Also, there is a limitation of simultaneous jobs so there is no real
> value to break down your workflow into a high number of parallel jobs.

An additional job can be dedicated to setup and dependencies installation but
must run before the three other steps. That's what dependent jobs are for.
## How to use dependent jobs?

Dependent jobs rely on the `jobs.<job id>.need` parameter
([documentation link][1]). The previous skeleton becomes:

```yaml
name: Code checking

on: pull_request

jobs:
  setup:
    # ...initialization steps...

  lint:
    needs: setup
    # ...linting checks steps...

  build:
    needs: setup
    # ...building checks steps...

  test:
    needs: setup
    # ...unit testing steps...
```

While this example is fairly simple, more exotic dependencies configuration
can be setup, including accepting failure status in needed jobs with the
`if: always()` parameter ([documentation link][2]).

Please check out [this article from Edward Thomson][3] for another example
of workflow break-down.

The point of the `setup` job is to have dependencies installed once and for
all. However, as each job starts from scratch, and data not being persisted
across jobs, the dependencies will be missing. Luckily, the `actions/cache`
comes to the rescue.

## Caching dependencies

The `actions/cache` ([repository link][4]) works in a standard way:

- Provide one or multiple folder(s) path to cache. The content to be cached
  is resolved at the end of the job.
- Provide a key to identify a cache. Given a key, if a cache is found, the
  content is restored at the step the action is called.

Using the cache actions, the GitHub action grows like this:

```yaml
name: Code checking

on: pull_request

jobs:
  setup:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 14
      - uses: actions/cache@v2
        with:
          path: node_modules
          key: node-modules-${{ hashFiles('package-lock.json') }}
      - run: npm install

  lint:
    needs: setup
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 14
      - uses: actions/cache@v2
        with:
          path: node_modules
          key: node-modules-${{ hashFiles('package-lock.json') }}
      - run: npm run lint

  build:
    needs: setup
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 14
      - uses: actions/cache@v2
        with:
          path: node_modules
          key: node-modules-${{ hashFiles('package-lock.json') }}
      - run: npm run build

  test:
    needs: setup
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 14
      - uses: actions/cache@v2
        with:
          path: node_modules
          key: node-modules-${{ hashFiles('package-lock.json') }}
      - run: npm run test
```

As `lint`, `build`, and `test` jobs must wait for `setup` to finish, it is
guaranteed that a cache is available. Then each job only has to restore the
cached dependencies to proceed.

> Make sure the cache key is properly set... Yes, this note comes from some
> rather painful experiences.

Thanks to [this article from Jonathan Wilkinson][5], this configuration can
be taken one step further: install dependencies only if no cached dependencies
is available!

The `actions/cache` returns a `cache-hit` boolean value which indicates
whether a cache was found or not, making it the perfect flag to conditionally
trigger dependencies installation. Only two changes in the `setup` job are
required:

- Add an ID to the cache step.
- Execute `npm install` only if the cache step `cache-hit` returns true.

```yaml
jobs:
  setup:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 14
      - uses: actions/cache@v2
        # ID to identify this step
        id: cache-node-modules
        with:
          path: node_modules
          key: node-modules-${{ hashFiles('package-lock.json') }}
      - run: npm install
        # Install dependencies only if there were not found in the cache
        if: steps.cache-node-modules.outputs.cache-hit != 'true'
```

## Keep code DRY: composite actions

The previous example contains a lot of redundancy so time to see if composite
actions deliver the promised DRY code.
### Set up the composite actions

The two steps we want to factorize are the Node setup and the cache action.
Based on [the metadata syntax documentation][8], the composite action
definition is:

```yaml
# .github/actions/cache-restore/action.yaml

name: "Cache restoration"
description: "Setup a NodeJS environment and restore cache if any, given a node version"

inputs:
  node-version:
    description: "Node version to use, default to LTS Fermium (14.x)"
    required: true
    default: lts/fermium
outputs:
  cache-hit:
    description: "Forward actions/cache cache-hit output"
    value: ${{ steps.node-cache.outputs.cache-hit }}

runs:
  using: "composite" # Mandatory parameter
  steps:
    # Setup a Node environment given a node version
    - name: Use Node.js ${{ inputs.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ inputs.node-version }}

    - name: Cache Node Modules
      id: node-cache
      uses: actions/cache@v2
      with:
        path: node_modules
        # Make the cache dependencies depending on the node version for matrix
        # testing: the package-lock.json would be the same so an additional
        # criteria is required to distinguish the caches
        key: node-modules-${{ inputs.node-version }}-${{ hashFiles('package-lock.json') }}
```

I have not included the `actions/checkout@v2` for two reasons:

- Most companies repositories being private, the import of the composite actions
  must be done via local file import ([syntax documentation here][9]). The job
  has to checkout the repository before loading the local file.
- I want to set up a another workflow which requires some additional
  parameters in the checkout step.

Our example becomes:

```yaml
name: Code checking

on: pull_request

jobs:
  setup:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: ./.github/actions/cache-restore
        id: cache-node-modules
        with:
          node-version: 14
      - run: npm install
        if: steps.cache-node-modules.outputs.cache-hit != 'true'

  lint:
    needs: setup
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: ./.github/actions/cache-restore
        id: cache-node-modules
        with:
          node-version: 14
      - run: npm run lint

  build:
    needs: setup
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: ./.github/actions/cache-restore
        id: cache-node-modules
        with:
          node-version: 14
      - run: npm run build

  test:
    needs: setup
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: ./.github/actions/cache-restore
        id: cache-node-modules
        with:
          node-version: 14
      - run: npm run test
```

### Matrix testing

It is now much easier to set up matrix configuration. Let's assume this
eccentric example:

- Use Node 12 and Node 14 to check the building step
- Use Node 15 to check linting
- Use Node 14 to run unit test

In this situation, the setup must cover all possibilities, the three Node
versions, to ensure the dependencies caches are properly generated. As the
cache key involves both the Node version and the `package-lock.json` hash,
the cached dependencies can safely be retrieved in the subsequent jobs.

```yaml
name: Code checking

on: pull_request

jobs:
  setup:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        # 12: for build
        # 14: for build and unit testing
        # 15: for linting
        node-version: [12, 14, 15]

    steps:
      - uses: actions/checkout@v2
      - uses: ./.github/actions/cache-restore
        id: cache-node-modules
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm install
        if: steps.cache-node-modules.outputs.cache-hit != 'true'

  lint:
    needs: setup
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: ./.github/actions/cache-restore
        id: cache-node-modules
        with:
          node-version: 15
      - run: npm run lint

  build:
    needs: setup
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12, 14]

    steps:
      - uses: actions/checkout@v2
      - uses: ./.github/actions/cache-restore
        id: cache-node-modules
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm run build

  test:
    needs: setup
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: ./.github/actions/cache-restore
        id: cache-node-modules
        with:
          node-version: 14
      - run: npm run test
```

## Real world conclusions

My little experiment is far from being a deep dive when I see what composite
actions can offer based on the documentation. But I like it so far:

- Composition pattern is always welcomed to keep the code DRY!
- Possibility to use composite actions in private repositories
- Possibility to execute some steps with a specific shell, quite useful for
  some setup tasks
- Good documentation!

If I were to mention the negative points, I can only think of conditional steps
not being supported. With a multiple workflows repository, I ended having redundant
sequences of the `cache-restore` action immediately following by an optional
`npm install`. That said, it is very specific and I believe not having conditional
steps is definitively bearable.

[1]: https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idneeds
[2]: https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#example-not-requiring-dependent-jobs-to-be-successful
[3]: https://www.edwardthomson.com/blog/github_actions_17_dependent_jobs.html
[4]: https://github.com/actions/cache
[5]: https://www.jonathan-wilkinson.com/github-actions-cache-everything
[6]: https://github.blog/changelog/2021-08-25-github-actions-reduce-duplication-with-action-composition/
[7]: https://docs.github.com/en/actions/creating-actions/creating-a-composite-action?learn=create_actions
[8]: https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#about-yaml-syntax-for-github-actions
[9]: https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#example-using-a-public-action-in-a-subdirectory
