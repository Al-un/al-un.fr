// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content"],

  // https://nuxt.com/docs/getting-started/styling#the-css-property
  css: ["~/app.css"],

  content: {
    // https://content.nuxt.com/get-started/configuration#markdown
    markdown: {
      tags: {
        // a: "AnchorLink",
      },
    },
    // https://content.nuxt.com/get-started/configuration#highlight
    highlight: {
      theme: {
        default: "github-light",
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});
