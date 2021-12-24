// Mainly inspired from
//  https://gist.github.com/calebdwilliams/b3d6b2c2ca242e8aec5acafd0a532db2
// Some other useful links:
// https://github.com/ponday-dev/rollup-plugin-lit-sass/blob/master/src/index.js
//
import { resolve, extname } from "path";
import sass from "sass";

/**
 *
 * @param {string} scssFilePath
 * @returns {string} CSS output
 */
const buildSass = (scssFilePath) => {
  const result = sass.compile(resolve(scssFilePath));
  const css = result.css;

  return css;
};

const isScss = (id) => extname(id) === ".scss";

/** @type {import("rollup").PluginImpl} */
const scssToLitCss = () => {
  return {
    name: "convert-scss-to-lit-css",
    load(id) {
      if (isScss(id)) {
        this.addWatchFile(resolve(id));
      }
    },
    transform(code, id) {
      if (!isScss(id)) {
        return;
      }

      const css = buildSass(id);
      const litCss = `import { css } from 'lit-element';
export default css\`${css}\`;`;

      return { code: litCss, map: { mappings: "" } };
    },
  };
};

export default scssToLitCss;
