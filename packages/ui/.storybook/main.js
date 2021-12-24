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
      // split by folder: https://stackoverflow.com/a/37477010/4906586
      include: [path.resolve(__dirname, "../src/components")],
      use: [
        { loader: path.resolve("./webpack.scss-to-lit.js") },
        { loader: "extract-loader" },
        { loader: "css-loader" },
        { loader: "sass-loader" },
      ],
    });
    config.module.rules.push({
      test: /\.scss$/,
      include: [path.resolve(__dirname, "../src/styles")],
      use: ["style-loader", "css-loader", "sass-loader"],
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
