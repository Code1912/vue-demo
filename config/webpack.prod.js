let commonConfig = require('./webpack.common.js');
let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let helpers = require('../helpers');
let config = webpackMerge(commonConfig,
    {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                parallel:true,
                mangle:false,
                sourceMap: true,
                compress: {
                    warnings: false
                }
            }),
        ]
    });
module.exports = config;