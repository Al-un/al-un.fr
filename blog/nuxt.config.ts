// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content"],
  content: {
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
