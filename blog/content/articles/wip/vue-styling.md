---
title: How I want my Vue app and components to bestyled.
description: Different conventions related to styling and styling in Vue.js that I adopted over the years.
draft: true
publicationDate:
---

# How I want my Vue.js app and components to be styled.

First of all, why having conventions related to styling when there is so much flexibility? Because there is too much flexibility and the habits are here to avoid any form of overhead.

While a personal project can be styled on-the-fly, with some acceptable inconsistencies, in a professional context, a simple "hey, align this text that way" can sometimes become a nightmare. Where should I write the styling? Should I use a grid or a flexbox? Should I hardcode the values or calculate the values from some variables? Conventions are here to solve this problem and at the same time, make the ouput more predictable. When there are multiple ways to implement some UI design, having a deterministic approach makes collaboration easier: from code conflict to code review, it makes things much easier when a whole is on the same page.

## CSS Pre-processor: choice of SCSS

Modern CSS is quite powerful and its full capabilities solve most of our common issues. For professional application though, I like to go with SCSS, or pick any CSS pre-processor of your choice. Main reasons are:

- Most front-end developers are used to it so having SCSS reduces the friction when on-boarding a new front-end developers.
- SCSS features such as variables or mixins helps in styling clarity.

### SCSS setup

SCSS setup is luckily quite straightforward now. If you are writing a Vue 3 application, it is likely that Vite is your bundler. In this case, the setup is as easy as installing Sass:

```sh
npm install --save-dev sass
```

Conversely, when using webpack, the good old `sass-loader` is here to help:

```sh
npm install --save-dev sass-loader sass
```

Documentation references:

- Vite documentation: [CSS Pre-processors](https://vitejs.dev/guide/features.html#css-pre-processors)
- Webpack documentation: [sass-loader](https://webpack.js.org/loaders/sass-loader/)


### Global setup

To unleash the full power of SASS, variables, mixins and functions must take part of the party. To avoid to import all of this in every file, an `additionalData` saves the day by making this import available in all Vue.js. However, only non classes styling must be imported. 

```js
// vite.config.js
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // ... other vite config
  css:{
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/_main.scss" as *;`
      }
    }
  }
})
```

The `@/styles/_main.scss` is another convention that I will detail later. An important point to keep in mind is that this file must export only non-classes styling such as variables, mixins, abstract classe or functions. Otherwise, the classes will be duplicated in the final output. Assume `@/styles/_main.scss` contains a `.xyz` CSS class. If `N` components are using SCSS styling, then the final CSS stylesheets will contain `N` copies of `.xyz`.

Documentation references:

- Vite documentation: [css.preprocessorOptions](https://vitejs.dev/config/shared-options.html#css-preprocessoroptions)
- Webpack documentation: [additionalData](https://webpack.js.org/loaders/sass-loader/#additionaldata)

## Folder structure

"Hey, in which folder should I put my XYZ file / styling?". Such a simple question, yet so difficult to answer. To circumvent this kind of situation, a folder structure standard can push back this type of question. It might sound overkill in some situation but the saved overhead, and associated headaches, are worth it.

To sort out where to put which styling, three types have to be considered:

- Utility styling, which output no code
- Application-wide styling
- Component specific styling
- Styling which are common to a set of components

### Attach styling to component: `src/components/`, `src/layouts/` and `src/views/`

This might sound obvious right? Especially considering the SFC (Single File Component) syntax. That being said, then another conventions come in: component folder structure. Again, to avoid headaches, I like the Nuxt.js approach:

- `src/views/`, or `src/pages/` to use Nuxt naming convention, for components connected to a route. Views should keep styling as minimal as possible, delegating to components or layout as much as possible. Think components as indivisible UI blocks and layouts as canvas. The only remaining buffer is the positioning of each components. 
- `src/layouts/` for components organizing the overall layouts of Views. Those components are often expected to be used once per view such as application headers, navigation menus or footers. 
- `src/components/` for the non-views, non-layouts components.

---------------------------------

### `src/styles/`: general styling folder

Any styling not embedded in Single File Components is stored in a _styles/_ folder. Single File Components files are, for most projects, spread over three folders:

- _views/_ for components connected to a route. Views should keep styling as minimal as possible, delegating to SFC in the two other folders.
- _layouts/_ for components organizing the overall layouts of _views_. Those components are often expected to be used once per view such as application headers, navigation menus or footers. This folder is inspired by [Nuxt layouts folder](https://nuxtjs.org/docs/2.x/directory-structure/layouts). A layout can be used in [nested routing](https://router.vuejs.org/guide/essentials/nested-routes.html).
- _components/_ for the non-views, non-layouts components.

### Styles/ folder content

The _styles/_ folder structure is simplified from the 7-1 pattern ([link to sass-guidelin.es](https://sass-guidelin.es/#the-7-1-pattern)): The _components/_, _layout/_ and _pages/_ folders are not required as styling is expected to be located, respectively, in _components/_, _layouts/_ and _views/_.

_abstract/_ folder has sub-folder representing a SASS feature. Each sub-folder content is re-exported in an `_index.scss` thanks to the [`@forward`](https://sass-lang.com/documentation/at-rules/forward) at-rule. As _abstract/_ must not contain any effective styling, it is safe to import a whole sub-folder such as `@use "../mixins"`.

The _index.scss_ re-exporting model can be applied to the _base/_ and _vendors/_ folders as long as there is no conflict in import order.

Finally, there are two files at the root of _styles/_ folder:

- `_imports.scss` aimed at being handled by `sass-loader` as data. If your project has been built up with Vue CLI, you change configure it in the [`vue.config.js`](https://cli.vuejs.org/config/#css-loaderoptions). As-of `sass-loader 10.x`, the data key is [`additionalData`](https://webpack.js.org/loaders/sass-loader/#additionaldata).
- `main.scss` aimed at being imported in the `main.js`

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
@use "venders/";

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

## Conventions

### Root CSS class name

Until Vue 2, components must be a single root element. Such root element can then be assigned the root CSS class name. The root CSS class name is the component name in kebab-casing. Some project might require a prefix.

```vue
<template>
  <div class="some-component"></div>
</template>

<script>
// SomeComponent.vue
export default {
  name: "SomeComponent",
};
</script>
```

Even if the root element is not directly styled, the root CSS class name should be added. This convention makes customizing child components easier:

```html
<template>
  <div class="my-parent-component">
    <!-- Then we know if we will have a node like <xxx class="some-component"> here -->
    <some-component></some-component>
  </div>
</template>
```

### To scope or not to scope

Vue.js official style guides recommending scoping all components ([Link](https://vuejs.org/v2/style-guide/#Component-style-scoping-essential)). Scoping add a `data` attribute to each element and restrict the generated CSS to this attribute. For example

```vue
<template>
  <div class="xyz-list">
    <!-- ... -->
  </div>
</template>

<style scoped>
.xyz-list {
  /* Some styling */
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

- There is some issues when involving both functional and stateful components (see [vue-loader#1136](https://github.com/vuejs/vue-loader/issues/1136))
- SASS placeholders are compiled like mixins when styling is scoped, even if the result CSS classes end up in the same chunk build.
- When styling child components, `::v-deep` is required, even if it is a CSS class added when invoking the child component (e.g.: `<child-component class="another-class-name">`)

### Don't be cheap on SCSS variables

SCSS variables can be used in SFC for clarity purpose: adding a name to a value makes it easier to remember the styling logic.

```vue
<style lang="scss" scoped>
$btn-gap: 16px;
$btn-height: 40px;
$btn-margin: 8px;

.xyz-btn-container {
  box-sizing: border-box;
  height: #{$btn-height + 2 * $btn-margin};
  padding: $btn-margin;

  .xyz-btn + .xyz-btn {
    height: $btn-height;
    margin-left: $btn-gap;
  }
}
</style>
```

Variables within each SFC being not exported, the only conflict you need to care about is conflicting with global SCSS variables.

### CSS variables are cool too!

CSS custom properties have their share of usefulness too! Also, when declared within style scoping will also scope the CSS custom property.

## Convention

- Root element to have CSS class name matching component name
- Non-BEM
