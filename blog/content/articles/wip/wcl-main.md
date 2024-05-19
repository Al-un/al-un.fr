---
title: Build your Web Component Library with Lit and Storybook
description: Leverage web components to build a library that can be used in any of your web application.
draft: true
publicationDate:
---

# Web Component Library Part 1: Create a Library With Lit and Storybook

Write once, run anywhere. Please, don't run away! You are in the right place to
read about web components and components library.

The article is the starting point of a series about writing a component library
using web components with the [Lit](https://lit.dev/) library.

## About the library

Why building a component library when there are so many [existing libraries](https://open-wc.org/guides/community/component-libraries/)? Those
components translate a significant part of your design system and consequently
your branding. A library, independent from any of your applications, guarantees the
consistency and prevents developers from re-inventing the wheel whenever a new
application is required.

The usual downside is IE11: web components work best with evergreen browsers. [Lit
elements documentation](https://lit.dev/docs/tools/production/#modern-+-legacy-build)
mentions possible polyfills but make sure it is worth the effort.

### Objectives: requirements and solutions

The objective is to lay the groundwork for a library powered by web components. This exercise
attempts to mimic some real world situation where an organisation is significantly huge/complex
enough to embrace multiple stacks such as front-end frameworks/libraries, like Vue.js,
React.js, etc, but also templating engines via frameworks such as Ruby on Rails, Django etc,
or even vanilla HTML (who knows). First requirements are:

- Interoperability is a must to have the library working independently from the application
  stack. You'll love this point if when you'll have to switch stack.
- Review can be done by both developers and designers. For the latter, a visual component
  rendering is required to have the components validated from a design perspective.

Some requirements will only be mentioned or partially covered. Dedicated articles are in-progress.

- Styling has to be exportable, mainly for utilities or basic styling such as buttons.
- Unit testing must prevent regression from happening
- Distribution has to be done in both way: as a NPM package and via a CDN.

To address each point:

- Interoperability is covered by web components custom elements technology.
- Review by designers is done with [Storybook](https://storybook.js.org/), optionally
  with [Chromatic](https://www.chromatic.com/).
- Styling is exported with dedicated [SCSS](https://sass-lang.com/) stylesheets with great fanfare (understand
  here, [PostCSS](https://postcss.org/)).
- Unit testing is handled by [Open WC testing library](https://open-wc.org/docs/testing/testing-package/),
  not showcased in this article.
- Library is built with [Rollup](https://rollupjs.org/guide/en/), partially covered in
  in this article, and the CDN distribution is powered by [Unpkg](https://unpkg.com/).

> The Open Web components organisation provides an awesome generator:
> `npm init @open-wc` ([documentation here](https://open-wc.org/guides/developing-components/getting-started/#generator)).
> While this is a robust option, its Storybook configuration currently lacks of
> flexibility that I often need in my work.

### Web components

This article will not include an introduction to web components. To explore web
components, here are some reading suggestions:

- [MDN introduction to web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Google web fundamentals web components](https://developers.google.com/web/fundamentals/web-components/)
- [CSS Tricks introduction to web components](https://css-tricks.com/an-introduction-to-web-components/)

In short, _Shadow DOM_ ensures that our components styling will not collide with
other components or the styling used by the consuming application. _HTML templates_,
especially with `<slot>`, provides some flexibility. Lastly, _Custom elements_ offers
the interoperability we want as previously mentioned.

Although those technologies will be abstracted by [Lit](https://lit.dev/) in this article,
it is always good to know a bit about what's happening under the hood: there is no
black magic involved so rest assured that no goat will be harmed when following this
guide.

## Setup the library

### Create the project

The first steps are the usual NPM package ceremony:

```sh
# Create the library folder
mkdir <folder path> && cd <folder path>

# Initialise the project by answering the questions
npm init

# Initialise the git stuff if necessary
git init
touch .gitignore
```

Fill the _.gitignore_, for example with:

```sh
# Dependencies
node_modules

# Web component library build outputs
dist
# Storybook build outputs
storybook-static

# Various tools logs
*.log
```

Let's pour some TypeScript flavour in our project:

```sh
# No specific TypeScript version is required for this project
npm install --save-dev typescript
```

> In a professional environment, I prefer only having exact version defined in the
> `package.json` to ensure all dependencies are compatible with each other.

A _tsconfig.json_ can be initialised with `npx tsc --init`. Otherwise, Lit
documentation recommends the following _tsconfig.json_ configuration
([documentation source](https://lit.dev/docs/tools/publishing/#compiling-with-typescript)):

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2021",
    "module": "es2015",
    "moduleResolution": "node",
    "lib": ["es2021", "dom"],
    "declaration": true,
    "declarationMap": true,
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    // This path is specific to this article
    "paths": {
      "@wcl-main/*": ["./src/*"]
    }
  }
}
```

For reference, _tsconfig.json_ documentation is [here](https://aka.ms/tsconfig.json).

The `@wcl-main` path alias will not be that useful in this article and is defined
only for the sake of having path aliases properly configured in both Storybook
and Rollup.

Our target being evergreen browsers, ES modules syntax is our way to go! No
more room for CommonJS...well, except for some configuration files. (Don't be
afraid if you don't see any Babel stuff in this article!)

I recommended reading the [ES modules guide from Modern Web](https://modern-web.dev/guides/going-buildless/es-modules/)
to know more about it.

### Add linting and formatting utilities

Optionally, the iconic ESLint & Prettier duo can be invited to the party for
some code linting and formatting:

```sh
# Install ESLint
npm install --save-dev eslint

# Install Prettier along with plugin and configuration
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier

# Install TypeScript parser and plugin
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

At the time of writing/testing this article, ESLint plugin requires ESLint v8. Compatibility
with the latest ESLint v9 is in-progress:

```sh
# Install ESLint v8
npm install --save-dev eslint@^8.0.0
```

A simple ESLint configuration inspired by [configuration from the Lit Element
TypeScript starter kit](https://github.com/PolymerLabs/lit-element-starter-ts/blob/master/.eslintrc.json):

```jsonc
// .eslintrc

{
  // If you are part of a monorepo, this can be useful
  "root": true,
  "env": {
    "browser": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "prettier"]
}
```

Prettier configuration is pretty much (no pun intended) up to your preferences.
For reference, the options list can be found in [this documentation page](https://prettier.io/docs/en/options.html).

A `lint` script in the _package.json_ will put those two in action.

```json
{
  "scripts": {
    "lint": "eslint --ext .ts --ext .js src"
  }
}
```

### Create our first web component with Lit

Install the Lit Element dependency (from
[Lit getting started](https://lit.dev/docs/getting-started/#install-locally-from-npm)):

```sh
npm install --save-dev lit
```

And let's create our first component with a simple button which supports two themes:

```ts
// src/components/super-button.ts

import {
  css,
  html,
  LitElement,
  PropertyDeclaration,
  PropertyDeclarations,
  TemplateResult,
} from "lit";
import { customElement } from "lit/decorators.js";
import { ClassInfo, classMap } from "lit/directives/class-map.js";

export type SuperButtonTheme = "primary" | "danger";

interface SuperButtonPropsDeclaration extends PropertyDeclarations {
  theme: PropertyDeclaration;
}

// customElement decorator defines and register the custom element:
// https://lit.dev/docs/api/decorators/#customElement
@customElement("super-button")
export class SuperButton extends LitElement {
  /** Button theme, default to "primary" */
  theme!: SuperButtonTheme;

  constructor() {
    super();

    this.theme = "primary";
  }

  // some basic button styling to get started.
  static styles = css`
    :host {
      display: inline-block;
    }

    .super-button {
      align-items: center;
      border-radius: 8px;
      display: flex;
      flex-direction: row;
      padding: 8px 16px;
      width: 100%;
    }

    .super-button.primary {
      background-color: rebeccapurple;
      color: white;
    }

    .super-button.danger {
      background-color: crimson;
      color: white;
    }
  `;

  /**
   * List of button properties that can be defined by an attribute
   *
   * TS decorators cannot be used due to a bug which impacts Storybook.
   * If you skip the Storybook part, using TS decorators is totally fine.
   *
   * Issue mentioned in Storybook kitchen sink:
   * https://github.com/storybookjs/storybook/blob/next/examples/web-components-kitchen-sink/src/components/sb-button.ts#L57
   * Related Lit property issue:
   * https://github.com/Polymer/lit-html/issues/1476
   *
   * @example
   *  <super-button theme="danger">Caution!</super-button>
   *
   * @see StaticProperties https://lit.dev/docs/components/properties/#declaring-properties-in-a-static-properties-field
   * @see PropertyOptions https://lit.dev/docs/components/properties/#property-options
   */
  static get properties(): SuperButtonPropsDeclaration {
    return {
      theme: { type: String },
    };
  }

  /**
   * List of CSS classes to apply to a single elements thanks the built-in
   * `classMap` directive
   *
   * @see classMap https://lit.dev/docs/templates/directives/#classmap
   */
  get cssClasses(): ClassInfo {
    return { "super-button": true, [this.theme]: true };
  }

  render(): TemplateResult {
    return html`<button class=${classMap(this.cssClasses)}>
      <slot></slot>
    </button>`;
  }
}
```

Nice! We now have a component but it would be even better if we could see it,
right? Obviously, we could build a web page, import our component to see how
it renders but when it comes to render a specific component in an isolated
manner, why not use a tool specialized in that? Time for Storybook to take the
stage!

## Visualise with Storybook

### Setup

Following the [installation guide](https://storybook.js.org/docs/web-components/get-started/install),
Storybook provides a convenient helper to add Storybook and configure it:

```sh
# At the time of writing this article, Storybook 8.1.1 is installed.
npx storybook@latest init
```

At this point, the Storybook helper should detect:

- The framework (`web-components`), with the `lit` dependencty
- The package manager

Alternatively, if you prefer having more control, the documentation provides the different
parameters for the initialisation helper:

```sh
npx storybook@latest init \
  # Define the framework used to build our components
  --type web_components \
  # Enforce a package manager
  --package-manager=npm
```

This article hasn't defined a builder yet. Webpack being the default builder for Storybook,
we will pick Webpack here.

Check that Storybook is properly installed by starting it:

```sh
npm run storybook
```

While TypeScript is all set up by the Storybook helper, the path alias has yet
to be added. To let Storybook know how to resolve the path alias, the webpack
configuration has to be extended in the _.storybook/main.js_ file:

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

```js
// .storybook/main.js

const path = require("path");

module.exports = {
  // Only .mdx and .ts stories will be used so other extensions are not required
  stories: ["../src/**/*.stories.@(mdx|ts)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  core: {
    builder: "webpack5",
  },

  webpackFinal: async (config, { configType }) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "@wcl-main": path.resolve(__dirname, "../src"),
      },
    };

    return config;
  },
};
```

<sub>[Gist: wcl-main_sb-main.js](https://gist.github.com/Al-un/da493255b494f2c501b2a87203d77790)</sub>

### Create a story

Time to write our first story! Feel free to delete or keep Storybook generated examples,
usually created under the _src/stories_ folder.

```ts
// src/components/super-button.stories.ts

import { html } from "lit";
import { Meta, Story } from "@storybook/web-components";

// Path alias is not useful here but ensures that aliases work in Storybook
import "@wcl-main/components/super-button";
import { SuperButtonTheme } from "@wcl-main/components/super-button";

interface SuperButtonStoryAttrs {
  content: string;
  theme: SuperButtonTheme;
  onClick: () => void;
}

export default {
  title: `WCL/components/SuperButton`,
  argTypes: {
    content: { control: "text" },
    theme: { control: "select", options: ["primary", "danger"] },
    onClick: { action: "onClick" },
  },
  args: { content: "My super button!", theme: "primary" },
} as Meta;

const Template: Story<SuperButtonStoryAttrs> = ({
  content,
  theme,
  onClick,
}) => html`<super-button .theme=${theme} @click=${onClick}
  >${content}</super-button
>`;

export const Primary = Template.bind({});
Primary.args = {
  theme: "primary",
};

export const Danger = Template.bind({});
Danger.args = {
  theme: "danger",
};
```

<sub>[Gist: wcl-main_super-button_story.ts](https://gist.github.com/Al-un/438a106db29ae757e26ba21cf328ea11)</sub>

Start storybook to see how it renders.

### Webpack 5

Webpack 5 support is available from Storybook 6.2 ([Release note here](https://storybook.js.org/releases/6.2)).
Based on their [blog article on Webpack 5 support](https://storybook.js.org/blog/storybook-for-webpack-5/),
the instructions can be found on [this gist](https://gist.github.com/shilman/8856ea1786dcd247139b47b270912324).

It's available...so let's try it out!

```sh
# Add Webpack 5:
# --save-exact: to ensure exactly version is currently installed without checking
#               the package-lock.json. Not really relevant here but force of habit...
# --force     : to override the peer dependency from @storybook/builder-webpack4
npm install --save-dev --save-exact --force webpack@^5.0.0

# Add some Storybook Webpack 5 utilities
npm install --save-dev @storybook/builder-webpack5 @storybook/manager-webpack5
```

> To avoid Webpack version conflict as by default Storybook dependencies expect
> Webpack 4 as a peer dependency, install Webpack 5 before initialising storybook.
> Otherwise, `npm install --force` might be required

Update _.storybook/main.js_:

```js
module.exports = {
  // ... existing config
  core: {
    builder: "webpack5",
  },
};
```

Ensure that nothing got broken in the way by restarting Storybook. The choice of
using Webpack 4 or Webpack 5 will be important when it comes to dependencies
version related to SASS.

## Style with SCSS + PostCSS

In a real world library, it is not recommended to style component manually one
by one. It opens the door to styling inconsistency and redundancy.
Of course, it is possible to factorize common styling with the `css` template literal
function (for example in the [Kor component library](https://github.com/kor-ui/kor/blob/develop/components/accordion/kor-accordion.ts#L33))
but as suggested in the introduction, my personal preferences goes with SCSS.

### Convert styling to SCSS

Before anything, let's make TypeScript happy with:

```ts
// shims.d.ts

declare module "*.scss" {
  // Some loader can directly convert the SCSS file into a CSSResultGroup and
  // make it ready-to-use by Lit components but let's keep things simple.
  // Clever tricks can wait.
  const styling: string;
  export default styling;
}
```

We can now extract our styling into a dedicated `.scss` file:

```scss
// src/components/super-button.scss

$rhythm: 8px;

:host {
  display: inline-block;
}

.super-button {
  align-items: center;
  border: 1px solid #23232339;
  border-radius: $rhythm;
  display: flex;
  flex-direction: row;
  overflow: hidden hidden;
  padding: $rhythm 2 * $rhythm;
  width: 100%;

  // Enjoying a bit of nesting here
  &.primary {
    // Let's have some CSS custom properties for more flexibility
    background-color: var(--wcl-primary, rebeccapurple);
    color: white;
  }

  &.danger {
    background-color: var(--wcl-danger, crimson);
    color: white;
  }
}
```

<sub>[Gist: wcl-main_super-button.scss](https://gist.github.com/Al-un/5dd9dfed89445b3ada07c6fc8a266c25)</sub>

Note: the `border-color: #23232339` ([alpha hex notation](https://preset-env.cssdb.org/features#hexadecimal-alpha-notation))
is added to ensure that PostCSS works properly. At the time of writing this
article, the feature is at stage 2. PostCSS configuration is detailed in
the next section.

And import this file into our component:

```ts
// src/components/super-button.ts

import { css, unsafeCSS } from "lit";
// ...
// Path alias is not useful here but ensure that aliases are properly configured
// when we will build our library.
import styling from "@wcl-main/components/super-button.scss";
// ...

@customElement("super-button")
export class SuperButton extends LitElement {
  // ...
  // Remove old styling
  static styles = css`
    ${unsafeCSS(styling)}
  `;
  // ...
}
```

<sub>[Gist: wcl-main_super-button-v2.ts](https://gist.github.com/Al-un/5d0c34f8bf1f6cfb0f1b13a61db312c1)</sub>

The different styling loader, `css-loader` for Webpack (Storybook) and PostCSS
plugin for Rollup (build) provides styling in raw text format so it has to
be converted into a Lit Element friendly format via `unsafeCSS`.

Some plugin or loader can handle the conversion but, with Storybook and Rollup,
making the code compatible with both Webpack loaders and Rollup plugins, as well as
taking into account SCSS _and_ PostCSS processing, is not worth the effort, from
my perspective, when a single can meet our requirement.

### Update Storybook configuration

Storybook does not understand SCSS by default and this is where the dependency maze
begins. Depending on the webpack version, the webpack loaders need to meet specific
version requirements:

| Dependency         | Webpack 4 | Webpack 5 | Comment                                                                  |
| ------------------ | --------- | --------- | ------------------------------------------------------------------------ |
| webpack            | 4.x       | 5.x       |                                                                          |
| -                  | -         | -         | -                                                                        |
| @storybook/\*      | < 6.2     | >= 6.2    | Webpack5 is not enabled by default and additional utilities are required |
| sass               | -         | -         | No restriction                                                           |
| sass-loader        | <= 10.x   | >= 11.x   |                                                                          |
| postcss            | -         | -         | No restriction (postcss-loader 4.3.0 accepts both PostCSS 7 and 8)       |
| postcss-loader     | <= 4.x    | >= 5.x    | postcss-loader 5.x+ accepts both PostCSS 7 and PostCSS 8                 |
| postcss-preset-env | -         | -         | Requires PostCSS 7                                                       |

```sh
# Install SASS and its webpack loader
npm install --save-dev sass sass-loader
# Install PostCSS, its webpack loader and a configuration preset
npm install --save-dev postcss postcss-loader postcss-preset-env
```

Add a webpack rule for SCSS files:

```js
// .storybook/main.js
module.exports = {
  // ...

  webpackFinal: async (config, { configType }) => {
    // ...

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        { loader: "css-loader" },
        { loader: "postcss-loader" },
        { loader: "sass-loader" },
      ],
    });

    return config;
  },
};
```

Pick a stage for `postcss-preset-env` (more information on the [repository](https://github.com/csstools/postcss-preset-env)):

```js
// postcss.config.js

// Remove the linting ignore comments if you don't need it

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  plugins: [postcssPresetEnv({ stage: 2 })],
};
```

Finally check that Storybook still runs _and_ if SCSS and PostCSS work as
expected.

For debugging purpose, `npm run storybook -- --debug-webpack` is
an useful option to check what is the exact webpack configuration loaded by
Storybook.

> Note on Storybook PostCSS: Storybook recommends using [`@storybook/addon-postcss`](https://preset-env.cssdb.org/features#overflow-property)
> but this addon only handles CSS files. On the other hand, [`@storybook/preset-scss`](https://www.npmjs.com/package/@storybook/preset-scss)
> is a one-liner support of SCSS files but does not allow PostCSS to get in the
> loader configuration. For references:
>
> - [PostCSS addon webpack loader configuration](https://github.com/storybookjs/addon-postcss/blob/master/src/index.ts#L71-L76po)
> - [SCSS preset webpack loader configuration](https://github.com/storybookjs/presets/blob/master/packages/preset-scss/index.js#L33-L35)

### Style linting

For those who want to go further and check style linting, `stylelint` is here
for you:

```sh
npm install --save-dev stylelint stylelint-config-sass-guidelines stylelint-order
```

Create a _.stylelintrc.json_ configuration file:

```json
{
  "extends": "stylelint-config-sass-guidelines",
  "plugins": ["stylelint-order"]
}
```

Add the style `lint:style` linting script in the _package.json_:

```json
{
  "scripts": {
    "lint": "stylelint src"
  }
}
```

Relevant links are:

- [Stylelint getting started](https://stylelint.io/user-guide/get-started)
- [`stylelint-config-sass-guidelines` README](https://github.com/bjankord/stylelint-config-sass-guidelines)
- [`stylelint-order` README](https://github.com/hudochenkov/stylelint-order)

## Build with Rollup

So far so good: we can create and view our web components. However, it would
be sad if they could not be used in some application. Before getting into
publishing, we have to "build" our library.

### Install dependencies

As recommended by the [Lit documentation](https://lit.dev/docs/tools/production/#building-with-rollup),
Rollup will be our bundler. For starters, a bunch of dependencies have to be
installed:

```sh
# Install rollup
npm install --save-dev rollup

# To support path aliases
npm install --save-dev @rollup/plugin-alias

# To resolve import
npm install --save-dev @rollup/plugin-node-resolve

# To handle SCSS and PostCSS at the same time
npm install --save-dev rollup-plugin-postcss
# Or for PostCSS 7 users:
npm install --save-dev rollup-plugin-postcss@^3

# To handle typescript
npm install --save-dev @rollup/plugin-typescript
# Alternatively:
npm install --save-dev rollup-plugin-typescript2

# To provide some nice report :)
npm install --save-dev rollup-plugin-summary

# To clean the output directory before each build
npm install --save-dev rimraf
```

<sub>[Gist](https://gist.github.com/Al-un/65ed65093b2cffee7e5fcd9f1b5510eb)</sub>

Note: if your web components library lives inside a mono-repository, I
highly recommend using `rollup-plugin-typescript2` due to issue like
[`rollup/plugins#287`](https://github.com/rollup/plugins/issues/287)

### Define Rollup configuration

A simple _rollup.config.js_ configuration is required. The configuration
example is not optimal but should do the job and allow us checking if
the output is as expected:

- SCSS and PostCSS are properly working
- TypeScript code is transpiled to the correct ES version

```js
// rollup.config.js

import { defineConfig } from "rollup";

import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import summary from "rollup-plugin-summary";
import postcss from "rollup-plugin-postcss";

// ----------------------------------------------------------------------------

export default defineConfig({
  // Re-export all components from here
  input: ["src/index.ts"],

  // Build in ES Modules syntax
  output: [{ format: "es", dir: "dist" }],

  plugins: [
    // Define path aliases
    alias({
      entries: [{ find: /^@wcl-main\/(.*)$/, replacement: "src/$1" }],
    }),

    // Resolve node modules
    resolve(),

    postcss({
      // Define loader to use
      use: ["sass"],
      // Override the default extensions set
      extensions: [".scss"],
      inject: false,
      // Don't extract styling into dedicated files
      extract: false,
      minimize: false,
      // PostCSS configuration file is then shared between Rollup and Storybook
      config: "postcss.config.js",
    }),

    typescript(),

    // Print bundle summary
    summary(),
  ],

  preserveEntrySignatures: "strict",
});
```

<sub>[Gist: wcl-main_rollup.js](https://gist.github.com/Al-un/5bc57ea63d8413f8281aed5946f3619e)</sub>

Note that Rollup configuration can be written in ES Modules
syntax.

The configuration declares a _index.ts_ which is currently missing:

```ts
// src/index.ts

// Our super button is feeling quite lonely at the moment, please give
// him some friends!
export * from "./components/super-button";
```

<sub>[Gist: wcl-main_components-index.ts](https://gist.github.com/Al-un/42ab1371994507d6bac92da19cf5d176)</sub>

### Add build script

Finally, the last step is to create the `build` script:

```json
{
  "scripts": {
    "build": "rimraf dist/ && rollup --config rollup.config.js"
  }
}
```

Building with `npm run build` should now provide a nice output in `dist/`
folder \o/

## Publish on NPM

For the sake of completeness, let me add a quick paragraph regarding
publishing the library on NPM. This section has rough coverage. I am
working on another article dedicated to library build and distribution.

### Prepare the library for publishing

A NPM account is required to publish packages on the [NPM registry](https://www.npmjs.com/).
Please create an account if you don't have one yet.

Update the _package.json_:

```jsonc
{
  "name": "<your package name>",
  "version": "<package version>",
  "description": "<package short description>",
  "author": "<your name>",
  "license": "<license>",
  // Or whatever main file you have defined in the Rollup configuration
  "main": "dist/index.js",
  // Let's add everything at the moment
  "files": ["dist/", "src/"]
}
```

<sub>[Gist: wcl-main_publish-package.jsonc](https://gist.github.com/Al-un/6ba5c9e005f63f019088a73a9ad4c1f9)</sub>

### Publish the library

- Login on NPM with `npm login`. An email will be requested. To check if you
  are properly logged in, `npm whoami` will tell you.
- `npm publish --dry-run` is useful to check that all the files you want to
  publish are properly here
- Publish simply with `npm publish`. If your package name is scoped, i.e. it
  looks like `@<scope>/<package name>`, the `--access=public` option is
  required unless you have a paid NPM account
- Package info can be checked with `npm info`

### Check the CDN distribution

For a quick check of your package distribution, https://unpkg.com will help
you by providing a CDN distribution of your NPM package.

The CDN distribution of the package can be checked via `https://unpkg.com/browse/<package name>@version/`.
For example: https://unpkg.com/browse/@al-un/wcl-main@0.0.1/.

Navigating through the browsing screen, the `dist/index.js` URL reveals to be
`https://unpkg.com/@al-un/wcl-main@0.0.1/dist/index.js` so let's create a
simple HTML page to test it out:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script
      type="module"
      src="https://unpkg.com/@al-un/wcl-main@0.0.1/dist/index.js"
    ></script>
  </head>
  <body>
    <div>
      <h2>A normal super button</h2>
      <super-button theme="primary">A super primary button!</super-button>
    </div>

    <div style="--wcl-primary: limegreen">
      <h2>A super button with limegreen custom primary color</h2>
      <super-button theme="primary">Another super primary button!</super-button>
    </div>
  </body>
</html
```

Open the page in your favourite browser.

---

And that's it to get started with web components libraries!

Thank you for reading and happy library coding!
