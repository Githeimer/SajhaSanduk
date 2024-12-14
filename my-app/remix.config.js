/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    v2_routeConvention: true,
    v2_meta: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
  },
  serverModuleFormat: "esm",
  tailwind: true, // Ensure Tailwind is enabled
  postcss: true, // Enable PostCSS
  cssBundle: true, // Enable CSS bundling
};
