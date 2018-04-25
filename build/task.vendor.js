'use strict';
let _=require("lodash");
let helpers=require("../helpers");
let assets=require("./assets.json");
let gulp = require("gulp4");
let uglify = require("gulp-uglify");
let concat = require("gulp-concat");
let cssmin = require('gulp-minify-css');
let taskUtil=require("./task.util")
let args=helpers.args();
let env=args.env;

function  fullPath(pathArray) {
    return pathArray.map(p=>helpers.root(p));
}
gulp.task("vendor:js", function () {
    return taskUtil.minifyJS(gulp.src(fullPath(assets[env].js))
        .pipe(concat("vendor.js")))
        .pipe(gulp.dest(helpers.root('dist/assets/js')));
});
gulp.task("vendor:css", function () {
    return taskUtil.minifyCSS(gulp.src(fullPath(assets[env].css))
        .pipe(concat("vendor.css")))
        .pipe(gulp.dest(helpers.root('dist/assets/css')));
});
gulp.task("vendor:fonts", function () {
    return gulp.src(fullPath(assets.fonts))
        .pipe(gulp.dest(helpers.root('dist/assets/fonts')));
});
gulp.task("vendor:html", function () {
    return gulp.src(helpers.root('src/index.html'))
        .pipe(gulp.dest(helpers.root('dist/')));
});
gulp.task("vendor:build", function (done) {
    return gulp.parallel(["vendor:js","vendor:css","vendor:fonts",'vendor:html'])(done);
});
module.exports=function () {
    return gulp.parallel(["vendor:js","vendor:css","vendor:fonts",'vendor:html']);
};