
const path = require('path')
const nodeExternals = require("webpack-node-externals");
const webpack = require('webpack');
const merge = require('webpack-merge');
 
const {getRoot} = require('./helpers')



const common = {    
    target: "node",   
    mode: 'development',   
    module: { rules: [
      {test: /\.[tj]sx?$/, exclude: /node_modules/, use: ["babel-loader"]}, 
      ]},
    
    resolve: { 
      extensions: [".ts", ".js", ".tsx", ".jsx", ".json", ".scss", ".css", ".html"],
      mainFields: ['browser','module','jsnext:main','main'],
      modules: [getRoot(), getRoot("src"), getRoot("node_modules")]
     },
    
    devtool: "#source-map",
    
    node: {
      __dirname: false,
      __filename: false
    },
    externals: [nodeExternals()],
  }


const desktop = {
      output: {
        filename: 'desktop.js',
        publicPath: '/' }
    }


const app = {
  output: { filename: 'app.js', publicPath: '/' },
  module: {
  rules: [
    {test: /\.less$/,use: ["style-loader", "css-loader", "less-loader"]},
    {test: /\.scss$/,use: ["style-loader","css-loader","sass-loader"]},
    {test: /\.css$/,use: ["style-loader", "css-loader"]},
    {test: /\.(ttf2?|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,loader: "file-loader"},
    {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,loader: "url-loader?limit=10000&mimetype=application/font-woff"},
  ]
      },
      plugins: [
        new webpack.NamedModulesPlugin,
        
      ]
    }


const appConfig = merge.smart(app, common, )
const desktopConfig = merge.smart(desktop, common)

const webpackConfig = {appConfig, desktopConfig}

module.exports = webpackConfig