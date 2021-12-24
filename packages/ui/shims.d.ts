declare module "*.scss" {
  // https://stackoverflow.com/a/60029264/4906586
  import { CSSResult } from "lit";

  // .scss import in Lit components must be type as CSSResult by Rollup
  // and Webpack
  const styling: CSSResult;
  export default styling;
}
