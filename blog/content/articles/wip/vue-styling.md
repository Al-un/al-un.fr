---
title: Vue.js styling
draft: true
publicationDate:
---

# How I want to style my Vue.js components <!-- omit in toc -->

Styling practices I want to keep improving, focusing on Vue.js

- [CSS Pre-processor: choice of SCSS](#css-pre-processor-choice-of-scss)
- [Folder structure](#folder-structure)
  - [Styles/: Simple file structure adapted to Vue.js](#styles-simple-file-structure-adapted-to-vuejs)
  - [Styles/ folder content](#styles-folder-content)
  - [Example](#example)
- [Conventions](#conventions)
  - [Root CSS class name](#root-css-class-name)
  - [To scope or not to scope](#to-scope-or-not-to-scope)
  - [Don't be cheap on SCSS variables](#dont-be-cheap-on-scss-variables)
  - [CSS variables are cool too!](#css-variables-are-cool-too)
- [Convention](#convention)

## CSS Pre-processor: choice of SCSS

Vue.js, via vue-loader, supports multiple CSS pre-processor ([link to vue-loader doc](https://vue-loader.vuejs.org/guide/pre-processors.html)): Sass/SCSS, LESS & Stylus. My projects are exclusively using SCSS due to habits and legacy. SCSS being pretty standard, I also like style sharing between multiple projects, including non-Vue.js projects.

## Folder structure

Although my past projects share similarities regarding folder structure, I haven't encountered a real standardization.

### Styles/: Simple file structure adapted to Vue.js

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
