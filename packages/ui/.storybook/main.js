const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/web-components",
  core: {
    builder: "webpack5",
  },

  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [{ loader: "css-loader" }, { loader: "sass-loader" }],
    });

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "@al-ui": path.resolve(__dirname, "../src"),
      },
    };

    return config;
  },
};
