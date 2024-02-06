// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "@nuxtjs/color-mode", // https://color-mode.nuxtjs.org/
  ],

  // https://nuxt.com/docs/getting-started/styling#the-css-property
  css: ["~/app.css"],

  content: {
    // https://content.nuxt.com/get-started/configuration#markdown
    markdown: {
      tags: {
      },
    },
    // https://content.nuxt.com/get-started/configuration#highlight
    highlight: {
      theme: {
        default: "vitesse-dark",
        light: "github-light",
        dark: "github-dark",
        sepia: "solarized-light",
      },
    },
  },

  // https://color-mode.nuxtjs.org/#configuration
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    // hid: 'nuxt-color-mode-script',
    // globalName: '__NUXT_COLOR_MODE__',
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    // classSuffix: '-mode',
    storageKey: "nuxt-color-mode",
  },
});
