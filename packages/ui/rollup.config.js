import { defineConfig } from "rollup";

import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import summary from "rollup-plugin-summary";
// import postcss from "rollup-plugin-postcss";
import { allComponentFiles, handleEntryFileName } from "./rollup.utils";

import scssToLit from "./rollup.scss-to-lit";

// ----------------------------------------------------------------------------
console.log("ALL COMPONENTS", allComponentFiles);
export default defineConfig({
  // Re-export all components from here
  input: { ...allComponentFiles, main: "src/index.ts" },

  // Build in ES Modules syntax
  output: [{ format: "es", dir: "dist", entryFileNames: handleEntryFileName }],

  plugins: [
    // Define path aliases
    alias({
      entries: [{ find: /^@al-ui\/(.*)$/, replacement: "src/$1" }],
    }),

    // Resolve node modules
    resolve(),

    scssToLit(),

    // postcss({
    //   // Define loader to use
    //   use: ["sass"],
    //   // Override the default extensions set
    //   extensions: [".scss"],
    //   inject: false,
    //   // Don't extract styling into dedicated files
    //   extract: false,
    //   minimize: false,
    //   // PostCSS configuration file is then shared between Rollup and Storybook
    //   config: "postcss.config.js",
    // }),

    typescript(),

    // Print bundle summary
    summary(),
  ],

  preserveEntrySignatures: "strict",
});
