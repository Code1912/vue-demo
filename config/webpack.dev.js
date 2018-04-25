let commonConfig = require('./webpack.common.js');
let webpackMerge = require('webpack-merge');
let helpers = require('../helpers');
let config= webpackMerge(commonConfig,{
    devtool:"source-map"
});
module.exports =config;