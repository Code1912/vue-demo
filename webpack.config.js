let helpers = require('./helpers');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let copyWebpackPlugin=require("copy-webpack-plugin");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let config= {
    entry: {
        app:helpers.root('src/modules/evekit-shell/app.ts'),
        vendor:helpers.root('src/vendor.ts')
    },
    output: {
        path: helpers.root('dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: "[name]",
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
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
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
                loaders:  ExtractTextPlugin.extract( "raw-loader")
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
    },  externals:[{
        iview: 'iview',

    }],
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#source-map',
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
                 name: [ 'vendor']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
             hash : false,
            chunks:['vendor', 'app']
         }),
        new ExtractTextPlugin("assets/css/[name].css", {allChunks: true}),

        new copyWebpackPlugin([{
            from: 'node_modules/bootstrap/dist/fonts',
            to:helpers.root("dist/assets/fonts")
        },{
            from: 'node_modules/font-awesome/fonts',
            to:helpers.root("dist/assets/fonts")
        }])
    ]
};
if (process.env.NODE_ENV === 'production') {
    config.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    config.plugins = (config.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
module.exports =config;