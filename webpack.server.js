const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const config = {
    // inform webpack we are building for nodejs
    target: 'node',

    // the name of the root file
    entry: './src/index.js',

    // where to put the output bundle
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'build'),
        libraryTarget: 'commonjs2',
    },

    externals: [webpackNodeExternals()],

    plugins: [
        new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
    ],
};

module.exports = merge(baseConfig, config);
