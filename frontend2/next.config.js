// module.exports = (phase, { defaultConfig }) => {
//     return {
//       /* config options here */
//     }
//   }


const withLess = require('@zeit/next-less')
module.exports = withLess({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  }
    // cssModules: true
    /* config options here */
})

// const withLess = require("@zeit/next-less");
// const withCSS = require("@zeit/next-css");

// module.exports = withCSS(
//   withLess({
//     webpack(config, options) {
//       return config;
//     }
//   })
// );