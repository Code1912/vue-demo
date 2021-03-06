let gulp = require("gulp4");
let del = require("del");
let browserSync = require("browser-sync");
let vendorTask= require("./build/task.vendor");
let coreTask= require("./build/task.core");
let modulesTask=require("./build/task.modules");
let historyApiFallback = require('connect-history-api-fallback');
let args=require('./helpers').args();
gulp.task('clean', (done) =>
    del(['./dist/'], done)
);
gulp.task('browser-sync', function (done) {
    if(args.env==='dev'){
        browserSync.init({
            server: {
                baseDir: "./dist",
                ghostMode: false,
                middleware: [historyApiFallback()]
            }
        });
    }
    done();
    //  gulp.run("watch");
});
gulp.task('build', function (done) {
    return gulp.series(
        modulesTask())(done);
});
gulp.task('default', function (done) {
    return gulp.series("clean", vendorTask(),coreTask(),modulesTask(),"browser-sync")(done);
});