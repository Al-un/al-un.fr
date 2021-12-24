// eslint-disable-next-line no-undef
module.exports = function (content) {
  return `import { css } from 'lit';
export default css\`${content}\`;`;
};
