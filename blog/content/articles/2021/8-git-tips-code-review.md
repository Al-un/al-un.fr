---
title: 8 Git Tips to Improve Code Reviewing
publicationDate: 2021-08-31
medium: https://betterprogramming.pub/8-git-tips-to-improve-code-reviewing-71cae7883d6f
---

# 8 Git Tips to Improve Code Reviewing

The last months were quite code review intensive. However, unlike previous code review spikes, I spent a bit of time finding out how I could make my life easier.

---

The examples in this article use two simple JSON files:

- `beers.json` ([source](https://github.com/Al-un/beerworld/blob/develop/git/pr/beers.json))
- `countries.json` ([source](https://github.com/Al-un/beerworld/blob/develop/git/pr/countries.json))

A pull request is created from `feature/update-countries` branch against `master` branch with changes in `countries.json`:

```diff
  },
  {
    "code": "jp",
-   "name": "Japon"
+   "name": "Japan"
  },
+ {
+   "code": "uk",
+   "name": "United Kingdom"
+ }
]
```

<sub>Simulating a typo correction 😁</sub>

## 1. Isolate Review Repository and Work Repository

After multiple git branches misfortunes, I now use two clones of a repository to isolate development activities from reviewing tasks: `<the_repo>` and `<the_repo>-review`. Additional clones, if required, simply follow the `<the_repo>-<purpose>` syntax.

![img](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*XsRkpv2LP6aNqg9T)

With such a structure, I am not worried if I messed up the branches in the `[repo]-review` folder. It also saves me a lot of `git stash`. Stashing is fine but when I frenetically jump between multiple branches, it can become nerve-racking.

When reviewing code, I sometimes try, or briefly draft, the changes before submitting a comment to ensure that what I will write makes sense. With a dedicated review repository, I can play around very easily without caring about stashing changes.

## 2. Update a Branch From Remote Without Checkout

I more and more needed to update the common branches, `develop` or `master`, without checking it out. Thankfully, the code is simple:

```sh
git fetch origin <branch>:<branch>
```

This syntax assumes that the branch can be fast-forwarded. Otherwise, a checkout is required. For example, after a feature branch is rebased, my way is to use the following code:

```sh
git checkout feature/update-countries
git fetch origin feature/update-countries
git reset --hard origin/feature/update-countries
```

Documentation links:

- [`git checkout`](https://git-scm.com/docs/git-checkout)
- [`git fetch`](https://git-scm.com/docs/git-fetch)

## 3. List Properly All Changes From a Pull Request

While the GitHub and GitLens VS Code extensions provide a good interface to display changes, knowing how to display the changes in the terminal helped me more than once. It all starts with the following code:

```sh
git diff master...

# Equivalent after 2.30
git diff --merge-base master

# Equivalent before 2.30:
git diff $(git merge-base master HEAD)
```

![new and old syntax providing the same output](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*a-zMpPxoUSvH1q5QSokVMA.png)

Why complicating the `git diff` command? If the `master` branch has received some updates, a simple `git diff master` lists all the differences, not only those brought by the feature branch.

Let’s assume that `master` received some updates in the `beers.json` file and the `feature/update-countries` branch did not modify it. Here’s the result:

![This simulates two pull requests being merged into “master” before “feature/update-countries” is merged](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*1YU1hxZQA4K6pNw_9due7w.png)

As mentioned, a simple `git diff master` returns all the differences, as shown below:

![img](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*wB0aSBCtdyJUN6i8IxUj5w.png)

Hence the need of the `master...` range or the `--merge-base` option.

As a frontend developer, my reviews often cover redundant files pattern, such as the following:

- `src/components/some-folder/another-folder/Something.ts`
- `src/components/some-folder/another-folder/Something.spec.ts`
- `src/components/some-folder/another-folder/Something.stories.ts`

I find it useful to display changes for a component and its related files:

```sh
git diff master.. -- src/components/some-folder/**/*.ts
```

Documentation links:

- [`git diff`](https://git-scm.com/docs/git-diff)
- [`git log`](https://git-scm.com/docs/git-log)

**Note**: I do not use `git blame` as the GitLens VS Code extension ([homepage](https://gitlens.amod.io/)) provides this information. Feel free to check its [documentation page](https://git-scm.com/docs/git-blame) as it is a useful command.

## 4. List All Changed Files

Thanks to the previous tip and the `--name-status` option ([documentation link](https://git-scm.com/docs/git-diff#Documentation/git-diff.txt---name-status)), listing modified files by a pull request is a piece of cake, as shown below:

```sh
git diff --name-status master...
# OR
git diff --master-base --name-status master
```

Such a list in VS Code terminal comes in handy as a simple Ctrl+click / Cmd+click opens the file. This command ends up being my usual first step in my code review ceremony.

![git commando output](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*IYKnzVuJ8wZVxRQvSDBSVQ.png)

Without `--master-base` or without the `...` range, `beers.json` would also appear which is not the desired outcome.

If you want to break it down it by commit, you can use the following command:

```sh
git log --oneline --name-status master..
```

Without the `..` range operator, it will include commits that are present in both `master` and `feature/update-countries` branch.

## 5. Execute NPM Commands Against Added and Modified Files Only

To recycle the `git diff` command even further, my current team built up some magic command to run `npm run lint` against added and modified files only, ignoring deleted files. Thanks a lot, team!

```sh
git diff --name-status master... | awk '/^[A|M].\*\.(js|ts)$/ {print $2}' | xargs npm run lint
```

Replace `(js|ts)` with the desired extensions list. For example, with a Vue.js project, the extension list could be `(js|ts|vue)`.

This specific command is a life savior in our daily lives as we are updating our linting rules. Some linting rules require complex operations, such as file renaming so we preferred not changing the whole codebase all at once but gradually evolving it.

We do have some CI to automatically check it but it does not hurt checking locally before submitting a pull request.

## 6. Delete Multiple Branches With “Git Branch”

In addition to `git fetch origin --prune` which deletes the reference of remotely deleted branches ([documentation link](https://git-scm.com/docs/git-fetch#Documentation/git-fetch.txt---prune)), I like keeping my local branches' references clean.

After reviewing multiple pull requests, removing all the branches can quickly become a hassle. Within my code review repository, I can mass delete branches after a big review session:

```sh
git branch --list <pattern> | xargs git branch -d
```

![git branch output](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*14XVGYmx1HPs1dPfQG8rCg.png)

_Note that `-d` is used. Make sure you know what you are doing if you use “git branch -D” 😨_

---

Shame area: now comes the lessons… well… learned from “not very brilliant” situations.

## 7. Fix Past Commit(s) with `git rebase -i`

When updating my code based on a reviewer’s comments, I… uh… sometimes don’t properly check if I corrected all the occurrences so obviously, I missed a spot or two.

Of course, I can use `git commit -m "oops, forgot here"`, but it is not very clean. So if I can afford to (e.g., having changes not pushed yet or rewriting a safe part of the history), I prefer to correct past commit(s).

If only the last commit has to be edited, `git commit --amend` is enough. Editing older commits requires an interactive rebase.

For example, if I want to modify commit `e935a02` which is a child of `b6719a9` .

![git log](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*K5S6lbidM16bfD-8VCf3Cw.png)

Start the interactive rebase. The starting point must be the commit _before_ the oldest commit you want to edit.

```sh
git rebase -i b6719a9
```

![git rebase start](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*to76GOOplFoOS3blvhO3rA.png)

_`git log` is useful to find the starting point of the interactive rebase._

The list of commits from the provided starting point, the starting point being excluded, appears and for each commit, an action has to be defined.

![git rebase](![Alt text](image-2.png))

The rebase will stop at the commit `e935a02` . Changes can be done and once finished, `git commit --amend` updates the commit:

![update commit](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*fR0V5ubz07yARBYsXzDUDQ.png)

_For this example, I just changed the commit message but you are free to amend the commit with more file changes._

Note that, like any rebase, this rewrites the branch history:

Friendly reminder, just in case: this is definitively **NOT** recommended for public branches.

## 8. Bring Commits From an Incorrect Branch to the Correct One With `git cherry-pick`

This, unfortunately, happened more often than my pride could admit 😅. Before splitting my working repository and my review repository, forgetting switching to the correct branch happened more often than it should.

Example: working on `feature/update-countries` branch, I modified the `beers.json` which is out of scope.

![whoopsie...](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*eFYOEokpGMC-6qzK1xgSRQ.png)

`git cherry-pick` combined with `git log` can help us moving the last two commits to the correct branch:

```sh
# Back to master
git checkout master

# Spawn a branch if necessary or checkout to the correct branch
git checkout -b fix/oops-the-beers

# And save the day!
git log --reverse --pretty=%h --max-count=2 feature/update-countries | xargs git cherry-pick
```

![img](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GdiXBZBx9U8_whjScbZJ7w.png)

_I left the “--oneline” argument in from a force of habit but it is not necessary here_

- `--reverse` : cherry-picking has to be executed in the correct order
- `--max-count=2` : adjust the number to your situation.
- `--pretty=%h` (or `--format=%h` ): only the commit hash is needed

The trick only works if the last `N` commits have to be moved. `git log` has a `--grep` option but I strongly advise against using this trick with nonconsecutive commits.

The erroneous commits can now be removed from `feature/update-countries` branch. Note that this impacts the branch history!

```sh
git reset HEAD~2
# OR
git reset 0f34663
```

Use `git reset --hard` if you are sure the changes can be discarded.

---

I hope this article will help you in some way or another to improve your daily lives. As for the last two tips, I wish you will not need them too often.

Some code review sessions could actually turn into some tragic git mishap so knowing some “(dirty?) tricks” can save you a lot of troubles.

Thank you for reading so far and happy code review!
