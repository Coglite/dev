
const path = require('path')
const nodeExternals = require("webpack-node-externals");
//const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
//const CopyPlugin = require('copy-webpack-plugin')
//const CleanWebpackPlugin = require('clean-webpack-plugin')
//const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const merge = require('webpack-merge');

const ROOT = path.resolve(__dirname, '..');
const getRoot = path.join.bind(path, ROOT);

module.exports = env => {

const common = {
    
    target: "node",
    
    mode: 'development',
    
    module: {rules: [{test: /\.[tj]sx?$/,use: ["babel-loader"]}]},
    
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
      //target: "electron-main",
      //entry: "./src/main/index.ts",
      output: {filename: 'desktop.js' }
    }


const app = {
  //target: "electron-renderer",
  //entry: "./src/renderer/app.tsx",
  output: { filename: 'app.js' },
  module: {
  rules: [
    {test: /\.less$/,use: ["style-loader", "css-loader", "less-loader"]},
    {test: /\.scss$/,use: ["style-loader","css-loader","sass-loader"]},
    {test: /\.css$/,use: ["style-loader", "css-loader"]},
    {test: /\.(ttf2?|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,loader: "file-loader"},
    {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,loader: "url-loader?limit=10000&mimetype=application/font-woff"},
  ]
      },
      plugins: [new webpack.NamedModulesPlugin]
      //plugins: [new ExtractTextPlugin({ filename: `${distDir}/app.css` }), definePlugin]
    }

const appConfig = merge.smart(app, common, )
const desktopConfig = merge.smart(desktop, common)

return appConfig, desktopConfig

}
