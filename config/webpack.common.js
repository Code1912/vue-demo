let helpers = require('../helpers');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let copyWebpackPlugin=require('copy-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let config= {
    entry: {
       // app:helpers.root('src/index.ts'),
      //  vendor:helpers.root('src/vendor.ts')
    },
    output: {
        path: helpers.root('dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: ["evekit", "[name]"],
        umdNamedDefine: true,
        //   publicPath: '/dist/'
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the 'scss' and 'sass' values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.ts$/,
                loaders: ['ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loaders:  ExtractTextPlugin.extract( 'raw-loader')
            },
            {
                test: /\.html$/,
                loaders: ['raw-loader'],
                exclude: /node_modules/,
            },

        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    externals:[{
        $: 'jquery',
        jQuery: 'jquery',
        toastr:'toastr',
        'vue-property-decorator':"VuePropertyDecorator",
        'vue-class-component':'VueClassComponent',
    }, function (context, request, callback) {
        //console.log(request)
        if (/^vue$/.test(request)) {
            return callback(null, `var Object.assign({default:Vue},Vue)`);
        }
        if (/^vue-router$/.test(request)) {
            return callback(null, `var  Object.assign({default:VueRouter},VueRouter)`);
        }
        if (/^iview$/.test(request)) {
            return callback(null, `var Object.assign({default:iview},iview)`);
        }
        if (/^axios/.test(request)) {
            return callback(null, `var Object.assign({default:axios},axios)`);
        }
        if (/^evekit\//.test(request)) {

            let key = request.split('/')[1];
            if(key==="core"){
                return callback(null, `var evekit['evekit-core']`);
            }
            return callback(null, `var evekit['${key}']`);
        }
        callback();
    }],
    plugins: [
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery'
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: [ 'vendor']
        // }),
        // new HtmlWebpackPlugin({
        //     template: 'src/index.html',
        //     hash : false,
        //     chunks:['vendor', 'app']
        // }),
        // new ExtractTextPlugin('assets/css/[name].css', {allChunks: true}),

        // new copyWebpackPlugin([{
        //     from: 'node_modules/bootstrap/dist/fonts',
        //     to:helpers.root('dist/assets/fonts')
        // },{
        //     from: 'node_modules/font-awesome/fonts',
        //     to:helpers.root('dist/assets/fonts')
        // }])
    ]
};
(function () {
    for (let key in config.externals[0]) {
        let array = config.externals[0][key].split(".");
        if (array.length > 1) {
            //   console.log(key,array)
            config.externals[0][key] = array;
        }
        let oldValue = config.externals[0][key];
        config.externals[0][key] = {
            commonjs2: key,
            commonjs: key,
            amd:key,
            umd:oldValue,
            root: oldValue
        }
    }

})();
module.exports=config;