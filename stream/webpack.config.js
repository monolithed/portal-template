const webpack = require('webpack');
const path = require('path');

const WebpackAssetsManifest = require('webpack-assets-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {dependencies} = require('./package.json');
const {DefinePlugin} = webpack;
const {ModuleFederationPlugin} = webpack.container;

const SOURCE_PATH = 'src';
const INDEX_FILE = 'index.html';

module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,

        // Порт, на котором будет запущено приложение и статика
        port: 3006,

        // Разршешить динамические пути в URL
        historyApiFallback: true,

        // Создавать сборочную директорию
        writeToDisk: true,

        // Автоматически открывать браузера после сборки
        open: true
    },

    mode: 'none',

    entry: {
        app: path.resolve(__dirname, 'src', 'index')
    },

    target: 'web',

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'auto',

        // Очищать сборочную директорию
        clean: true

        // chunkFilename: "[name]/[id].[chunkhash].chunk.js"
        // crossOriginLoading: 'anonymous', // use-credentials
    },


    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },

    plugins: [
        new WebpackAssetsManifest({
            publicPath: '/',
            output: 'assets-manifest.json',
            integrity: true,
            integrityHashes: ['sha512'],
            space: 4
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, SOURCE_PATH, INDEX_FILE)
        }),

        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),

        new ModuleFederationPlugin({
            name: '__tutorial_stream__',
            filename: '__tutorial_stream__.js',
            shared: {
                'react': {
                    requiredVersion: dependencies.react
                },
                'react-dom': {
                    requiredVersion: dependencies['react-dom']
                },
                'react-query': {
                    requiredVersion: dependencies['react-query']
                }
            },
            exposes: {
                './Tutorial': './src/pages/Tutorial'
            }
        })
    ]
};
