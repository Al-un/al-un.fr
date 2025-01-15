---
title: How I want my Vue app and components to be styled.
description: Different conventions related to styling and styling in Vue.js that I adopted over the years.
medium: https://to-be-defined.com
publicationDate: 2024-05-18
---

# How I Want my Vue.js App and Components to be Styled.

Why have conventions related to styling when there is so much flexibility? Because there is too much flexibility and the following habits are an attempt to avoid any form of overhead.

While a personal project can be styled on-the-fly, with some acceptable inconsistencies, in a professional context, a simple "hey, align this text that way" can become a nightmare. Where should I write the styling? Should I use a grid or a flexbox? Should I hard-code the size value or calculate it? Conventions are here to solve this problem and at the same time, making the output more predictable. When there are multiple ways to implement an UI design, having a deterministic approach makes collaboration easier: from code conflict to code review, having everyone is on the same page is key for a smooth cooperation.

## CSS Pre-processor: choice of SCSS

Modern CSS is quite powerful and its full capabilities solve most of our common issues, especially if you only need to support evergreen browsers. For professional applications though, I like to go with SCSS, or pick any CSS pre-processor of your choice. Main reasons are:

- Most front-end developers are used to it so having SCSS reduces the friction when on-boarding a new front-end developer.
- SCSS features such as variables or mixins helps in styling clarity.

### SCSS setup

SCSS setup is luckily quite straightforward now. If you are writing a Vue 3 application, it is likely that Vite is your bundler. In this case, the setup is as easy as installing `sass`:

```sh
npm install --save-dev sass
```

Conversely, when using webpack, the good old `sass-loader` tags along:

```sh
npm install --save-dev sass-loader sass
```

Documentation references:

- Vite documentation: [CSS Pre-processors](https://vitejs.dev/guide/features.html#css-pre-processors)
- Webpack documentation: [sass-loader](https://webpack.js.org/loaders/sass-loader/)

### Global setup

To unleash SASS full power, variables, mixins and functions should not be ignored. To avoid to import all of this in every file, an `additionalData` saves the day by making this import available in all Vue.js files.

```js
// vite.config.js
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // ... other vite config
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/_main.scss" as *;`,
      },
    },
  },
});
```

The `@/styles/_main.scss` is another convention that I will detail later. An important point is that this file compilation output must be empty by only exporting non-classes styling such as variables, mixins, abstract classes or functions. Otherwise, the classes will be duplicated in the final output. Assume `@/styles/_main.scss` contains a `.xyz` CSS class. If `N` components are using SCSS styling, then the final CSS stylesheets will contain `N` copies of `.xyz`.

Documentation references:

- Vite documentation: [`css.preprocessorOptions`](https://vitejs.dev/config/shared-options.html#css-preprocessoroptions)
- Webpack documentation: [`additionalData`](https://webpack.js.org/loaders/sass-loader/#additionaldata)

## Folder structure

"_Hey, in which folder should I put my XYZ file / styling?_". Such a simple question, yet so difficult to answer. To circumvent this kind of situation, a folder structure standard can push back this type of question. It might sound overkill in some situation but the saved overhead, and the associated headaches, are worth it.

To sort out where to put which styling, four types have to be considered:

- Utility styling, which output no code
- Application-wide styling
- Component specific styling
- Styling which are common to a set of components

### Attach styling to component: `src/components/`, `src/layouts/` and `src/views/`

This might sound obvious right? Especially considering the SFC (Single File Component) syntax. That being said, then another convention comes in: component folder structure. For this matter, I like the Nuxt.js approach:

- `src/views/`, or `src/pages/` to use Nuxt naming convention, for components connected to a route. Views should keep styling as minimal as possible, delegating to components or layout as much as possible. Think components as indivisible UI blocks and layouts as canvas. The only remaining buffer is the positioning of each components, relatively to each others.
- `src/layouts/` for components organizing the overall layouts of Views. Regarding components which are only used in Layout, such as application headers, navigation menus or footers, they can either live in this folder or `src/components/layouts`.
- `src/components/` for the non-views, non-layouts components.

### `src/styles/`: general styling folder

Any styling not embedded in Single File Components is stored in a _src/styles/_ folder. The _src/styles/_ folder structure is simplified from the 7-1 pattern ([link to sass-guidelin.es](https://sass-guidelin.es/#the-7-1-pattern)): The _components/_, _layout/_ and _pages/_ folders are not required as styling is expected to be located, respectively, in _src/components/_, _src/layouts/_ and _src/views/_.

_abstract/_ folder has sub-folder representing a SASS feature. Each sub-folder content is re-exported via an `_index.scss` thanks to the [`@forward`](https://sass-lang.com/documentation/at-rules/forward) at-rule. As _abstract/_ must not contain any effective styling, it is safe to import a whole sub-folder such as `@use "../mixins"`. In my projects, we had no need of SASS namespacing.

The _index.scss_ re-exporting model can be applied to the _base/_ and _vendors/_ folders as long as there is no conflict in import order.

Finally, there are two files at the root of _styles/_ folder:

- `_imports.scss` aimed at being handled by `sass-loader` as data. If your project has been built up with Vue CLI, you change configure it in the [`vue.config.js`](https://cli.vuejs.org/config/#css-loaderoptions). As-of `sass-loader 10.x`, the data key is [`additionalData`](https://webpack.js.org/loaders/sass-loader/#additionaldata).
- `main.scss` aimed at being imported in the `main.js`. A good example for the `main.scss` use-case is to import all `base/` content including CSS resets, your typography rules or some application-wide CSS styling.

### Example

The file structure of a complex project can look like:

```
|-- components/
|   ...components go here...
|-- layouts/
|   ...layout components go here...
|--styles/
|   |-- base/
|   |   |-- _index.scss
|   |   |-- _reset.scss
|   |   |-- _typography.scss
|   |-- mixins/
|   |   |-- _index.scss
|   |   |-- ...
|   |-- placeholders/
|   |   |-- _index.scss
|   |-- variables/
|   |   |-- _colors.scss
|   |   |-- _index.scss
|   |   |-- _sizes.scss
|   |   |-- _z-indexes.scss
|   |-- _imports.scss
|   |-- main.scss
|--views/
|   ...view components go here...
```

Both `main.scss` and `_imports.scss` are only re-export:

```css
/* _imports.scss */
@forward "abstract/mixins";
@forward "abstract/placeholders";
@forward "abstract/variables";

/* main.scss */
@use "vendors/";
@use "base/";
```

And `_imports.scss` is added to `vue.config.js`:

```js
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // Change "*" to whatever namespace you want if you need it
        additionalData: `@use "~@/styles/_imports as *;"`,
      },
    },
  },
};
```

Conversely, the `main.scss` is simply imported in your main file:

## Conventions

Over the years, I took some habits which hopefully make my life easier:

- Have the root element of a component having the kebab-cased name of the component as CSS class name.
- Use scoped styling when collaborating with large teams.
- Declare meaningful values with SCSS variables or CSS variables to increase readability.

### Root element CSS class name

Until Vue 2, components must be a single root element. The root element class name is the component class name in kebab casing. Even if the root element is not styled within the component, the kebab-casing class name must be added.

```vue
<template>
  <div class="some-component">
    <header>{{ title }}</header>
    <!-- the child component is expected to have a
    "some-child-component" CSS class in the root element -->
    <SomeChildComponent>
      <slot></slot>
    </SomeChildComponent>
  </div>
</template>

<script>
// SomeComponent.vue
export default {
  name: "SomeComponent",
};
</script>
```

The advantages I seek are:

- Components are easier in find in the elements inspector by searching for the class name:

  ```html
  <body>
    <main>
      <!-- SomeComponent.vue usage found here! -->
      <div class="some-component">Some content</div>
    </main>
  </body>
  ```

- Assuming components have unique name, a simple SASS nesting prevents styling conflict. However, complex applications will require different practices such as BEM conventions or scoped styling.

  ```scss
  .some-component {
    // This compiles into ".some-component header" which should
    // have enough specificity to avoid a styling conflict.
    header {
      font-weight: bold;
    }
  }
  ```

- Styling children components are easier as their root elements can easily be targeted.

  ```scss
  .some-component {
    // As SomeChildComponent follows the same convention, this styling
    // targets the root element of SomeChildComponent.
    .some-child-component {
      margin: 16px;
    }
  }
  ```

In Vue 3, I keep single root elements to maintain this practice. In the rare cases where multiple root elements are used, in a fragment-like manner, I often do not have the need to have a root element class name so it can be skipped.

### To scope or not to scope

Vue.js official style guides recommending scoping all components ([Style guide link](https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling) and [Vuejs 2 Link](https://vuejs.org/v2/style-guide/#Component-style-scoping-essential)). Scoping add a `data` attribute to each element and restrict the generated CSS to this attribute. For example:

```vue
<template>
  <div class="xyz-list">
    <!-- some content -->
  </div>
</template>

<style scoped>
.xyz-list {
  /* some styling */
}
</style>
```

When rendered, the DOM node looks like, attribute value being random:

```html
<div data-v-a1b2c3d4 class="xyz-list"></div>
```

with the associated styling:

```css
.xyz-list[data-v-a1b2c3d4] {
  /* Some styling */
}
```

Some notes about scoped styling:

- SASS placeholders are compiled like mixins when styling is scoped, even if the result CSS classes end up in the same chunk build.
- When styling child components, `::v-deep` is required, even if it is a CSS class added when invoking the child component (e.g.: `<child-component class="another-class-name">`)
- In Vue 2, there is some issues when involving both functional and stateful components (see [vue-loader#1136](https://github.com/vuejs/vue-loader/issues/1136))

That being said, it proved useful for large applications, especially when multiple projects are being implemented in parallel. When developers deployed changes in a shared testing environment, it avoided side-effect.

[CSS modules](https://vue-loader.vuejs.org/guide/css-modules.html#css-modules) can also be used but I find the `:class="$style.myClassName"` quite cumbersome. Also, I personally prefer kebab casing for my CSS class names.

### Don't be cheap on variables

SCSS variables can be used in SFC for clarity purpose: adding a name to a value makes it easier to remember the styling logic, avoiding magic numbers.

```vue
<style lang="scss" scoped>
$btn-gap: 16px;
$btn-height: 40px;
$btn-padding: 8px;

.xyz-btn-container {
  box-sizing: border-box;
  height: #{$btn-height + 2 * $btn-padding};
  padding: $btn-padding;

  .xyz-btn + .xyz-btn {
    margin-left: $btn-gap;
  }
}
</style>
```

Variables within each SFC being not exported, the only conflict you need to care about is conflicting with global SCSS variables.

If a value is used by different component, it can be included in the global import of `@/styles/_main.scss`. Instead, I use CSS variables, a.k.a CSS custom properties, for application wide values, even if the values are not expected to change. 

```scss
// src/styles/_main.scss or src/styles/_typography.scss
:root {
  --text-color-highlight: orange;
  --text-color-sub: darkolivegreen;
}

// Some component styling
.some-title {
  &.active {
    color: var(--text-color-highlight)
  }
  &.inactive {
    color: var(--text-color-sub)
  }
}

// Some other component
.some-quote {
  &.highlight {
    border-left: 2px solid var(--text-color-highlight);
  }
}

// Another component
.staff-credit {
  border: 1px solid var(--text-color-sub);
}
```

---
And that's it! Properly styling some front-end code can be fun and working with others is sadly an easy path to conflict (technical and less technical ones). Human factor is an important part of the thought process when defining guidelines: there is no silver bullet here, the best conventions are the ones your team agrees on (reasonably, of course!).

I hope these conventions can help reducing the complexity of the styling of your Vue.js application. Thank you for reading until here and happy styling!
