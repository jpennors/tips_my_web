const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const buildEntryPoint = entryPoint => ([
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    entryPoint,
]);

module.exports = {
    entry: {
        main: buildEntryPoint('./resources/assets/react/index.jsx'),
        admin: buildEntryPoint('./resources/assets/react/index.jsx'),
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/[name].js',
        // publicPath: '/public/',
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
            'tmw': __dirname + '/resources/assets/react',
        },
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'resources/assets/react/images', to: 'images' },
        ]),
        new webpack.HotModuleReplacementPlugin(),
    ],
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
};
