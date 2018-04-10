const config = require("./webpack.config.base");
const helpers = require("./helpers");
const path = require("path");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const webpack = require("webpack");
const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");
const merge = require("webpack-merge");
const OptimizeJsPlugin = require("optimize-js-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { defineEnv } = require("./webpack.common");

const ENV = "production";
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = merge(config, {
    devtool: "source-map",
    output: {
        path: helpers.root("build"),
        filename: "[name].[chunkhash].bundle.js",
        sourceMapFilename: "[name].[chunkhash].bundle.map",
        chunkFilename: "[id].[chunkhash].chunk.js"

    },
    
    module: {
        rules: [
            {test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"})},

            {test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader"
                })},
        ]
    },
    
    plugins: [

        new OptimizeJsPlugin({sourceMap: false}),
        new ExtractTextPlugin("[name].[contenthash].css"),
        defineEnv(ENV),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
// TODO: Need to workaround Angular 2's html syntax => #id [bind] (event) *ngFor
                htmlLoader: {
                    minimize: true,
                    removeAttributeQuotes: false,
                    caseSensitive: true,
                    customAttrSurround: [
                        [/#/, /(?:)/],
                        [/\*/, /(?:)/],
                        [/\[?\(?/, /(?:)/]
                    ],
                    customAttrAssign: [/\)?\]?=/]
                },

            }
        }),
    ],
});
