const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
// TODO: Replace these with imports - need to tsc?

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
        alias: {
            react: path.resolve(path.join(__dirname, './node_modules/react')),
            'babel-core': path.resolve(
                path.join(__dirname, './node_modules/@babel/core'),
            ),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            plugins: ['react-hot-loader/babel'],
                        },
                    },
                    'awesome-typescript-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(path.join(__dirname, 'public/index.html')),
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
