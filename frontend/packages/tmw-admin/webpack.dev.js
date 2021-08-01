const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
require('dotenv').config();

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        headers: { 'Access-Control-Allow-Origin': '*' },
        port: 3005,
        hot: true,
        historyApiFallback: true
    },
});
