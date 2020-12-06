// module.exports = (phase, { defaultConfig }) => {
//     return {
//       /* config options here */
//     }
//   }


// const withLess = require('@zeit/next-less')
// module.exports = withLess({
//   // cssModules: true,
//   // cssLoaderOptions: {
//   //   importLoaders: 1,
//   //   localIdentName: "[local]___[hash:base64:5]",
//   // },
//   loaders: [
//     {
//       loader: 'less-loader',
//       options: {},
//     },
//   ],
//   rules :{
//     test: /\.less$/,
//     exclude: /node_modules/,
//     // test: /\.(sass|less|css)$/,
//     loaders: ['less-loader']
//     // use: options.defaultLoaders.less,
//   },
//     // cssModules: true
//     /* config options here */
// })

const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const withSass = require('@zeit/next-sass');

module.exports = withSass(
  withLess({
    webpack(config, options) {
      return config;
    }
  })
);