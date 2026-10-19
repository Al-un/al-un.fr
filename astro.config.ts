import { defineConfig, fontProviders } from "astro/config";
import vue from "@astrojs/vue";

export default defineConfig({
  integrations: [vue({devtools: true})],

  fonts: [
    // Fonts for 2048 game
    {
      provider: fontProviders.local(),
      name: "Clear Sans",
      cssVariable: "--font-clear-sans",
      options: {
        variants: [
          {
            weight: "200",
            style: "normal",
            src: [
              "./src/apps/2048/fonts/ClearSans-Light-webfont.woff",
              // "./src/apps/2048/fonts/ClearSans-Light-webfont.svg",
              "./src/apps/2048/fonts/ClearSans-Light-webfont.eot",
            ]
          },
          {
            weight: "400",
            style: "normal",
            src: [
              "./src/apps/2048/fonts/ClearSans-Regular-webfont.woff",
              // "./src/apps/2048/fonts/ClearSans-Regular-webfont.svg",
              "./src/apps/2048/fonts/ClearSans-Regular-webfont.eot",
            ]
          },
          {
            weight: "700",
            style: "normal",
            src: [
              "./src/apps/2048/fonts/ClearSans-Bold-webfont.woff",
              // "./src/apps/2048/fonts/ClearSans-Bold-webfont.svg",
              "./src/apps/2048/fonts/ClearSans-Bold-webfont.eot",
            ]
          },
        ]
      }
    }
  ]
});
