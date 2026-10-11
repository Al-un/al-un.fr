---
title: TODO
draft: true
---

# My (S)CSS Way in XX Steps <!-- omit in toc -->

A mix of tips, tricks and suggestions for a more efficient and less painful web application styling.

- [Conventions](#conventions)
  - [Folder structure](#folder-structure)
  - [CSS properties](#css-properties)
  - [Writing style](#writing-style)
  - [Others](#others)
  - [Methodologies](#methodologies)
- [CSS / SASS Features](#css--sass-features)
  - [Grid and Flexbox](#grid-and-flexbox)
  - [Mixins vs placeholders](#mixins-vs-placeholders)
  - [Various tips](#various-tips)
- [In a Node.JS environment](#in-a-nodejs-environment)
  - [Webpack: SASS-loader](#webpack-sass-loader)
  - [Stylelint](#stylelint)
  - [Post CSS](#post-css)
- [Others](#others-1)

Underrepresented in interview questions, ignored in project management, sometimes despised, CSS is far from being a web outcast. This articles attempts to do justice to it capabilities.

1. Consistency is key
2. Keep the convention simple
3.

## Conventions

It will be never be emphasized enough: having clear and meaningful conventions is (one) key to maintain a decent consistency. Rather than falling into [the bikeshedding pitfall](https://fourweekmba.com/bikeshedding/), let's rely on existing and proven practices. That would also save us from reinventing the wheel or trying out a brilliant idea which will turn out being not so brilliant.

### Folder structure

- Simple structure

  ```
  _base.scss
  _layout.scss
  _components.scss
  main.scss
  ```

- 7-1 pattern ([Reference from sass-guidelin.es](https://sass-guidelin.es/#the-7-1-pattern))

  ```
  abstracts/
  base/
  components/
  layout/
  pages/
  themes/
  vendors/
  ```

References:

- [(Medium paid article) ITNext: Structure your Sass Projects](https://itnext.io/structuring-your-sass-projects-c8d41fa55ed4): overview of a simple folder structure and 7-1 pattern.
- [elad.medium.com: CSS Architecture - Folders and Files Structure](https://elad.medium.com/css-architecture-folders-files-structure-f92b40c78d0b): basic folder structure based on configuration and local files separation
- [dev.to: Structuring your SASS projects](https://dev.to/timothyrobards/structuring-your-sass-projects-50cm): overview of a simple folder structure and 7-1 pattern.
- [vanseodesign.com: Sass Directory Structures](https://vanseodesign.com/css/sass-directory-structures/): overview of a simple folder structure and 7-1 pattern.
- [matthewelsom.com: A Simple SCSS Architecture](https://matthewelsom.com/blog/simple-scss-playbook.html): the 5-1 pattern is a lighter version of 7-1 pattern.
- [(Medium paid article) SCSS / SASS Folder structure](https://medium.com/@harshppatel2880/scss-sass-folder-structure-5f06e7d10e09): folder struture with five top levels: tools, helpers, basic, layout, modules and pages

### CSS properties

[This article](https://mediatemple.net/blog/web-development-tech/different-logical-ways-group-css-properties/) lists three main ways to arrange CSS properties:

- Alphabetized (defended by [medium.com: Alphabetize your CSS properties, for crying out loud](https://medium.com/@jerrylowm/alphabetize-your-css-properties-for-crying-out-loud-780eb1852153))
- Grouped by categories
- Sorted by line length (advocated by [aerolab.co: Write better CSS to improve your code quality](https://aerolab.co/blog/write-better-css-to-improve-your-code-quality))

### Writing style

- All names, CSS classes, variables, mixins, functions, etc, are in kebab-cased
- If a hack has to be used, heavily comment it about why and how. Your future-self might thank you someday.
-

### Others

Other Resources:

- CSS-tricks CSS style guide ([link](https://css-tricks.com/css-style-guides/)) and SASS Style guide ([link](https://css-tricks.com/sass-style-guide/))
- https://cssguidelin.es/
- https://modernweb.com/writing-better-css/
- https://bettercss.guide/

### Methodologies

- BEM - **B**locks, **E**lements and **M**odifiers: http://getbem.com/introduction/
- OOCSS - **O**bject-**O**riented **CSS**: http://oocss.org/
- SMACC - **S**calable and **M**odular **A**rchitecture for **CSS**: http://smacss.com/
- Atomic CSS: https://github.com/nemophrost/atomic-css

## CSS / SASS Features

### Grid and Flexbox

### Mixins vs placeholders

### Various tips

- Prefer `padding` over `margin` for clickable elements. Not all of us have slender fingers so the bigger the clickable are, the easier it is.
- Put all your `z-index` in the same variable file. That would give a good overview of what is where and there will be no more surprise of "why is it below"?

## In a Node.JS environment

- Prefer the [`sass`](https://www.npmjs.com/package/sass) package over [`node-sass`](https://www.npmjs.com/package/node-sass) as it is deprecated due to [LibSass depreciation on October 2020](https://sass-lang.com/blog/libsass-is-deprecated)

### Webpack: SASS-loader

- `_main.scss` can be imported as an `additionalData` ([`sass-loader` Webpack documentation link](https://webpack.js.org/loaders/sass-loader/#additionaldata)).
- `additionalData` replaces `prependData` from [v9.0.0](https://github.com/webpack-contrib/sass-loader/releases/tag/v9.0.0). `prependData` was named `data`until [`v8.0.0`](https://github.com/webpack-contrib/sass-loader/releases/tag/v8.0.0)

### Stylelint

### Post CSS

// -------------

## Others

[creativebloq: A guide to writing better CSS](https://www.creativebloq.com/advice/a-guide-to-writing-better-css) TL;DR:

1. CSS reset
2. Know when to use CSS shorthand
3. Keep it DRY
4. Stop over-using `!important`
5. Keep consistent
6. Name things intelligently
7. Add comments when appropriate

[tutsplus.com: 5 Ways to Instantly Write Better CSS](https://code.tutsplus.com/tutorials/5-ways-to-instantly-write-better-css--net-3003) TL;DR:

1. CSS reset
2. Alphabetize CSS properties
3. Stylesheet organization
4. Consistency
5. Start after having proper HTML

[hackernoon: 6 tips to write a better CSS for Beginners](https://www.hackernoon.com/6-tips-to-write-a-better-css-for-beginners-kg2d3unk) TL;DR:

1. Write well structured HTML
2. CSS reset
3. Learn CSS best practices (https://code.tutsplus.com/tutorials/30-css-best-practices-for-beginners--net-6741)
4. Use developer tools
5. SASS
6. VS Code extension
