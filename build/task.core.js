let _=require("lodash");
let helpers=require("../helpers");
let gulp = require("gulp4");
let taskUtil=require("./task.util");
let commonConfig = require('../config/webpack.common.js');
let webpackMerge = require('webpack-merge');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let through=require('through2');
let fs=require('fs');
gulp.task("core:dts", function () {
    return taskUtil.dts("evekit-core")
        .pipe(through.obj(function (chunk, enc, cb) {
            fs.writeFileSync( helpers.root("node_modules/@types/evekit/core/index.d.ts") ,"export * from './app'","utf-8");
            fs.writeFileSync( helpers.root("node_modules/@types/evekit/index.d.ts") ,"export  class evekit{ }","utf-8");
            cb(null, chunk)
        }));
});
gulp.task("core:ts", (done) => {
    let config= webpackMerge(commonConfig,{
        entry : {
            'evekit-core': helpers.root('src/evekit-core/app.ts'),
        },
        plugins:[
            new ExtractTextPlugin('[name].css')
        ]
    });
  //  console.log(config);
    taskUtil.webpackCompile(config, done);
});
gulp.task("core:build",done=>{
    return gulp.series('core:dts','core:ts')(done);
});

module.exports=function () {
    return gulp.series('core:dts','core:ts');
};