const {resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const apiMocker = require('mocker-api');
const {dependencies} = require('./package.json');

const {DefinePlugin, container} = webpack;
const {ModuleFederationPlugin} = container;

const SOURCE_PATH = 'src';

module.exports = {
    devServer: {
        contentBase: resolve(__dirname, 'dist'),
        hot: true,
        port: 3001,

        // Разршешить динамические пути в URL
        historyApiFallback: true,

        // Создавать сборочную директорию
        writeToDisk: true,

        // Автоматически открывать браузера после сборки
        open: true,

        // Мокер
        before(app) {
            apiMocker(app, resolve('./mocker/index.js'));
        }
    },

    mode: 'none',

    entry: {
        main: resolve(__dirname, SOURCE_PATH, 'index')
    },

    target: 'web',

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    output: {
        filename: '[name].[contenthash].js',
        path: resolve(__dirname, 'dist'),
        publicPath: 'auto',
        clean: true
    },

    experiments: {
        topLevelAwait: true
    },

    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
                // use: [
                //     {
                //         loader: 'style-loader'
                //     },
                //     {
                //         loader: 'css-loader',
                //         options: {
                //             importLoaders: 1,
                //             modules: {
                //                 localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
                //             },
                //         },
                //     },
                //     {
                //         loader: 'postcss-loader'
                //     }
                // ],
            }
        ]
    },

    plugins: [
        // new SubresourceIntegrityPlugin({
        //     hashFuncNames: ['sha512']
        // }),

        new HtmlWebpackPlugin({
            template: resolve(__dirname, SOURCE_PATH, 'index.html')
        }),

        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),

        new ModuleFederationPlugin({
            name: 'platform',
            filename: 'remoteEntry.js',
            shared: {
                'react': {
                    requiredVersion: dependencies.react
                },
                'react-dom': {
                    requiredVersion: dependencies['react-dom']
                },
                '@reduxjs/toolkit': {
                    requiredVersion: dependencies['@reduxjs/toolkit']
                }
            }
        })
    ]
};
