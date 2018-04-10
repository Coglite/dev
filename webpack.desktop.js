var path = require('path')
var webpack = require('webpack')
var nodeExternals = require("webpack-node-externals");
var CleanWebpackPlugin = require('clean-webpack-plugin');


const ROOT = path.resolve(__dirname);
const getRoot = path.join.bind(path, ROOT);


const desktopConfig = {
//devtool: "#source-map",
target: "electron-main",   

mode: 'development',

entry: getRoot('src/desktop/main.ts'),

output: {
  path: getRoot('build/desktop'),
  filename: 'main.js'
},

module: { 
  rules: [
      {test: /\.[tj]sx?$/, exclude: /node_modules/, use: ["babel-loader"]}, 
      ]
},
    
resolve: { 
      extensions: [".ts", ".js", ".tsx", ".jsx", ".json", ".scss", ".css", ".html"],
      mainFields: ['browser','module','jsnext:main','main'],
      modules: [getRoot("src/desktop"), getRoot("node_modules")]
},

node: {
      __dirname: false,
      __filename: false
},

externals: [nodeExternals()],

plugins: [new CleanWebpackPlugin('dist')]

}

module.exports = desktopConfig


//new ExecaPlugin(({onBuildEnd: [{args: ["."], cmd: "electron", stdio: 'inherit'}]})) 