import fs from "fs";
import path from "path";

/**
 * Utility function to recursively fetch the list of components files
 * according to the provided pattern
 *
 * @param {String} dirPath source directory to start searching
 * @param {RegExp} pattern pattern to identify components files
 * @returns {{[key: string]: string}} list of absolute paths to components
 */
export const getFilesPath = (dirPath, pattern) => {
  const dirContent = fs.readdirSync(dirPath);
  let allFilesPath = [];

  dirContent.forEach((file) => {
    // Scan subdirectory
    if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
      allFilesPath = {
        ...allFilesPath,
        ...getFilesPath(`${dirPath}/${file}`, pattern),
      };
    }
    // Check if scanned file is a common component
    else if (pattern.test(file)) {
      const keyFolder = dirPath.substring(4) + (dirPath.length > 4 ? "/" : "");
      const keyFile = file.endsWith(".scss")
        ? file.substring(0, file.length - 5) + ".css"
        : file.substring(0, file.length - 3);

      allFilesPath = {
        ...allFilesPath,
        // bundle key: {folder}-{file}
        [keyFolder + keyFile]: path.join(dirPath, "/", file),
      };
    }
  });

  return allFilesPath;
};

/**
 * List of components files for this project example starting from
 * `src/components` by searching for TypeScript files and excluding unit tests
 * and stories files
 */
export const allComponentFiles = getFilesPath(
  "src/components",
  /^[\w-]+(?!(stories|spec))\.(ts|scss)$/
);

/**
 * Helper to convert a "main" chunk into "index.js" without hash while other
 * chunks keep their names with an appended hash
 *
 * @param {import('rollup').PreRenderedChunk} chunkInfo chunk information
 * @param {Object} options
 * @param {Boolean} options.hash if true, add hash to non-index index files.
 * Default is false
 * @param {String} options.main main chunk name, resulting in an "index.js".
 * Default to "main"
 *
 * @returns {String} Chunk final file name
 */
export const handleEntryFileName = (chunkInfo, { hash, main } = {}) => {
  // console.log("CHUNK", chunkInfo.name);
  if (chunkInfo.name === (main || "main")) {
    return "index.js";
  }

  const chunkFileName = hash ? "[name].[hash].js" : "[name].js";
  return chunkFileName;
};
