// --- al-ui config -----------------------------------------------------------
import "../src/styles/init.scss";

// --- Storybook global config ------------------------------------------------
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
