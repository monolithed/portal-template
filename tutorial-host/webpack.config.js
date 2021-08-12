const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const apiMocker = require('mocker-api');

const { name, dependencies } = require('./package.json');
const mocker = require('./__mocks__/proxyApi');

const { DefinePlugin, container } = webpack;
const { ModuleFederationPlugin } = container;

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

        // Заголовки бандлов
        headers: mocker._proxy.header,

        // Мокер
        before(app) {
            apiMocker(app, mocker);
        },
    },

    mode: 'none',

    entry: {
        main: resolve(__dirname, SOURCE_PATH, 'index'),
    },

    target: 'web',

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    output: {
        filename: '[name].[contenthash].js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/',

        // Очищать сборочную директорию
        clean: true,
    },

    experiments: {
        topLevelAwait: true,
    },

    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
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
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    plugins: [
        // new DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        // }),

        new webpack.ProgressPlugin(),

        new WebpackAssetsManifest({
            publicPath: '/dist',
            output: 'assets-manifest.json',
            integrity: true,
            integrityHashes: ['sha512'],
            space: 4,
        }),

        // new SubresourceIntegrityPlugin({
        //     hashFuncNames: ['sha512']
        // }),

        new HtmlWebpackPlugin({
            template: resolve(__dirname, SOURCE_PATH, 'index.html'),
        }),

        new ModuleFederationPlugin({
            name: 'host',
            filename: '[name].[contenthash].js',
            shared: {
                'react': {
                    requiredVersion: dependencies.react,
                },
                'react-dom': {
                    requiredVersion: dependencies['react-dom'],
                },
                '@consta/uikit': {
                    requiredVersion: dependencies['@consta/uikit'],
                },
                '@reatom/core': {
                    requiredVersion: dependencies['@reatom/core'],
                },
                '@reatom/react': {
                    requiredVersion: dependencies['@reatom/react'],
                },
            },
        }),

        new CleanWebpackPlugin({
            verbose: true,
        }),
    ],
};
