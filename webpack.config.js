const path = require("path");
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        "webpack-dev-server/client?http://localhost:3000",
        "webpack/hot/only-dev-server",
        "./resources/assets/react/index.jsx",
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/preset-env"] },
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
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
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
        alias: {
            "tmw": __dirname + "/resources/assets/react",
        },
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "js/index.js",
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'resources/assets/react/images', to: 'images' },
        ]),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, "public"),
        headers: { 'Access-Control-Allow-Origin': '*' },
        port: 3000,
        hot: true,
        historyApiFallback: true,
        proxy: {
            "*": 'http://localhost:8888',
        },
    },
};
