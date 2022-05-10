// Mainly inspired from
//  https://gist.github.com/calebdwilliams/b3d6b2c2ca242e8aec5acafd0a532db2
// Some other useful links:
// https://github.com/ponday-dev/rollup-plugin-lit-sass/blob/master/src/index.js
//
import { resolve, extname } from "path";
import sass from "sass";
import { pathToFileURL } from "url";
import postcss from "postcss";
import cssnano from "cssnano";

/**
 *
 * @param {string} scssContent
 * @returns {string} CSS output
 */
const buildSass = (scssContent) => {
  const result = sass.compileString(scssContent, {
    importers: [
      {
        // https://sass-lang.com/documentation/js-api/interfaces/FileImporter
        findFileUrl(url) {
          const alUnAlias = "~@al-un";

          if (!url.startsWith(alUnAlias)) {
            console.log("resolving to null");
            return null;
          }

          const resolved = new URL(
            // +1 to include trailing slash
            url.substring(alUnAlias.length + 1),
            pathToFileURL(`src/`)
          );

          return resolved;
        },
      },
    ],
  });
  const css = result.css;

  return css;
};

/**
 *
 * @param {string} cssContent
 * @returns {string}
 */
const processCss = async (cssContent) => {
  const processed = await postcss([cssnano()]).process(cssContent);

  return processed.css;
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

    async transform(code, id) {
      if (!isScss(id)) return;

      // const prependedScss = ``;
      const prependedScss = `@use "~@al-un/styles/_imports" as al-ui;`;
      // const prependedScss = `@use "../../styles/_imports.scss" as al-ui;`;
      const fullScss = `${prependedScss}\n${code}`;

      // console.log("id:", id);
      // console.log("fullScss:", fullScss);
      const css = buildSass(fullScss);

      const processedCss = await processCss(css);
      console.log("Processed", processedCss);

      const litCss = `import { css } from 'lit-element';
const style = css\`${processedCss}\`;
export default style`;

      return { code: litCss, map: { mappings: "" } };
    },
  };
};

export default scssToLitCss;
