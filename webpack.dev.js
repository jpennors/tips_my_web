const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        headers: { 'Access-Control-Allow-Origin': '*' },
        port: 3000,
        hot: true,
        historyApiFallback: true,
        proxy: {
            '*': 'http://localhost:8888',
        },
    },
});
