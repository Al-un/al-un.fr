import { defineConfig } from "rollup";

import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import summary from "rollup-plugin-summary";
import postcss from "rollup-plugin-postcss";

// ----------------------------------------------------------------------------

export default defineConfig({
  // Re-export all components from here
  input: ["src/index.ts"],

  // Build in ES Modules syntax
  output: [{ format: "es", dir: "dist" }],

  plugins: [
    // Define path aliases
    alias({
      entries: [{ find: /^@al-ui\/(.*)$/, replacement: "src/$1" }],
    }),

    // Resolve node modules
    resolve(),

    postcss({
      // Define loader to use
      use: ["sass"],
      // Override the default extensions set
      extensions: [".scss"],
      inject: false,
      // Don't extract styling into dedicated files
      extract: false,
      minimize: false,
      // PostCSS configuration file is then shared between Rollup and Storybook
      config: "postcss.config.js",
    }),

    typescript(),

    // Print bundle summary
    summary(),
  ],

  preserveEntrySignatures: "strict",
});
