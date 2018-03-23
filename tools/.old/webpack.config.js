const path = require('path')
var webpack = require('webpack');


const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isProduction = process.argv.indexOf('-p') >= 0;

const helpers = require('./helpers')



var config = {
entry: {
      desktop: helpers.root("src/desktop/desktop.ts"),
      app: helpers.root("src/app/app.tsx")
    },
output: {
      filename: "[name].js",
      path: helpers.root("dist")
    },

mode: "development",

target: "node",

node: {__dirname: false, __filename: false},

externals: [nodeExternals()],

resolve: {
  extensions: [".ts", ".js", ".tsx", ".jsx", ".json", ".html", ".css", ".scss"],
  modules: [helpers.root(), helpers.root("src"), helpers.root("node_modules")]
},



module: {
  rules: [
    {test: /\.[tj]sx?$/,use: ["ts-loader"]},
      {test: /\.css$/,use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader', query: {
                modules: true,
                sourceMap: !isProduction,
                importLoaders: 1,
                localIdentName: '[local]__[hash:base64:5]'
              }
            },
            {loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-import')({ addDependencyTo: webpack }),
                  require('postcss-url')(),
                  require('postcss-cssnext')(),
                  require('postcss-reporter')(),
                  require('postcss-browser-reporter')({disabled: isProduction})
                ]
              }
            }
          ]
        })
      },

    {test: /\.less$/,use: ["style-loader", "css-loader", "less-loader"]},
    {test: /\.scss$/,use: ["style-loader","css-loader","sass-loader"]},
    //{test: /\.css$/, use: [{loader: "style-loader"}, {loader: "css-loader", {}}]},
    {test: /\.json$/, loader: 'json-loader' },
    {test: /\.(jp?g|png|gif)$/, loader: 'file-loader', options: { hash: 'sha512', digest: 'hex', name: 'images/[hash].[ext]' } },
    {test: /\.(eot|woff2?|svg|ttf|otf)([\?]?.*)$/, loader: 'file-loader', options: { hash: 'sha512', digest: 'hex', name: 'fonts/[hash].[ext]' } },
    {test: /\.(png|woff|woff2|eot|ttf|svg)$/,loader: 'url-loader?limit=100000'}
  ]
},
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },

plugins: [
    new HtmlWebpackPlugin({template: 'src/app/app.html', excludeChunks: 'desktop'}),
    new ExtractTextPlugin({filename: 'styles.css', disable: !isProduction}),
    new CleanWebpackPlugin('dist', {root: helpers.root()})
    ]
  };

module.exports = config

