let _=require('lodash');
let helpers=require('../helpers');
let gulp = require('gulp4');
let taskUtil=require('./task.util');
let commonConfig = require('../config/webpack.common.js');
let webpackMerge = require('webpack-merge');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let args=helpers.args();
let fs=require('fs');
function buildModuleTask(moduleName) {
    let taskName = `build:evekit[${moduleName}]`;
    //todo:需要加上gulp-newer
    gulp.src([helpers.root(`src/modules/${moduleName}/resources/**/*.{jpg,jpeg,png,gif}`)])
        .pipe(gulp.dest(helpers.root(`dist/modules/${moduleName}/resources`)));
    gulp.task(taskName, function (done) {
        let config =webpackMerge( commonConfig,{
            output:{
                path:helpers.root( `dist/modules/${moduleName}/`),
                filename: 'app.js',
            },
            watch:args.env === 'dev',
            plugins:[
                new ExtractTextPlugin('app.css')
            ]
        });
        config.entry[`${moduleName}`] = helpers.root(`src/modules/${moduleName}/app.ts`);
       // console.log("modeul:",config)
        taskUtil.webpackCompile(config, done);
    });
    return taskName;
}
function  getModules() {
    let modules = [];
    let dirList = fs.readdirSync(helpers.root('src/modules'));
    dirList.forEach(function (item) {
        if (item.indexOf('.') > -1) {
            return;
        }
        modules.push(item);
    });
    return modules;
}
gulp.task('build:modules', function (done) {
    let modules = getModules();
    let tasks = modules.map(buildModuleTask);
    return gulp.parallel(tasks)(done);
});
module.exports=function () {
    let modules = getModules();
    let tasks = modules.map(buildModuleTask);
    return gulp.parallel(tasks);
};