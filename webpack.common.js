const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './react/app-main/app-main-entry.tsx',
        admin:'./react/app-admin/app-admin-entry.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: 'js/app-[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: ['react-hot-loader/webpack', 'babel-loader'],
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
        alias: {
            'tmw-main': path.resolve(__dirname, 'react/app-main/'),
            'tmw-admin': path.resolve(__dirname, 'react/app-admin/'),
            'tmw-common': path.resolve(__dirname, 'react/common/'),
        },
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'react/common/images', to: 'images' },
            { from: 'react/app-main/assets/images', to: 'images' },
            { from: 'react/app-admin/assets/images', to: 'images' },
        ]),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
