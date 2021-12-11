declare module "*.scss" {
  // Some loader can directly convert the SCSS file into a CSSResultGroup and
  // make it ready-to-use by Lit components but let's keep things simple.
  // Clever tricks can wait.
  const styling: string;
  export default styling;
}
