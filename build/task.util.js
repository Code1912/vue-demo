let helpers = require("../helpers");
let uglify = require("gulp-uglify");
let cssmin = require('gulp-minify-css');
let webpack=require('webpack');
let gutil = require("gulp-util");
let ts = require("gulp-typescript");
let args = helpers.args();
let gulp=require('gulp4');
let browserSync = require("browser-sync");
let reload = browserSync.reload;
let del=require('del')
let minifyJS = function (gulpStream) {
    if (args.minify) {
        return gulpStream.pipe(uglify({mangle: false}))
    }
    return gulpStream;
};
let minifyCSS = function minifyCSS(gulpStream) {
    if (args.minify) {
        return gulpStream.pipe(cssmin())
    }
    return gulpStream;
};

function handleError(err, stats, done) {
    if (err) {
        gutil.log('webpack: compilation error', err);
    } else {
        Object.keys(stats.compilation.assets).forEach(function (key) {
            gutil.log('webpack: output ', gutil.colors.green(key));
        });
    }
    let options = {
        colors: true,
        children: false,
        modules: false,
    };

    if (stats.hasErrors()) {
        options = {
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            chunkModules: false,
            modules: false,
            children: false,
            cached: false,
            reasons: false,
            source: false,
            errorDetails: true,
            chunkOrigins: false
        };
    }
    gutil.log('webpack:', stats.toString(options));
    if (done) {
        done();
    }
}
let webpackCompile = function webpackCompile(config, done) {
    config.watch = args.env === "dev";
    /*config.module.loaders[0].loaders=  config.module.loaders[0].loaders.map(p=>{
       return `${p}?configFileName=tsconfig.${args.env}.json`;
    })*/
    if (config.watch) {
        webpack(config).watch({
            aggregateTimeout: 300,
            ignored: [/node_modules/, /dist/]
        }, function (err, stats) {
            handleError(err, stats);
            if (config.entry["evekit-core"]) {
                dts("evekit-core")
            }
           reload();
        });
        done();
    }
    else {
        webpack(config, (err, stats) => {
            handleError(err, stats);
            reload();
            done();
        });
    }
};

function dts(module) {
    let src= helpers.root(`src/modules/${module}/**/*.ts`);
    let dest =helpers.root(`node_modules/@types/evekit/${module}`);
    if (module === "evekit-core") {
        src=helpers.root(`src/evekit-core/**/*.ts`);
        dest = helpers.root(`node_modules/@types/evekit/core`);
    }
  //  del.sync([dest]);
   // console.log(ts.createProject( helpers.root('tsconfig.json')));
    let tsProject = ts.createProject( helpers.root('tsconfig.json'), {
        outDir: dest,
        declaration: true,
        removeComments:args.env==="prd"
    });
    let tsResult = gulp.src([src]) // or tsProject.src()
        .pipe(tsProject());
    return tsResult.pipe(gulp.dest(dest));
}

module.exports = {
    minifyCSS,
    minifyJS,
    webpackCompile,
    dts
}