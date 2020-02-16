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
        port: process.env.FRONTEND_DEV_SERVER_PORT || 3000,
        hot: true,
        historyApiFallback: true,
        proxy: {
            '*': process.env.BACKEND_SERVER_URL || 'http://localhost:8888',
        },
    },
});
