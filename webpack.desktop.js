var path = require('path')
var webpack = require('webpack')
var nodeExternals = require("webpack-node-externals");
var CleanWebpackPlugin = require('clean-webpack-plugin');


const ROOT = path.resolve(__dirname);
const getRoot = path.join.bind(path, ROOT);


const desktopConfig = { 
target: "electron-main",   

mode: 'development',

entry: getRoot('src/desktop/main.ts'),

output: {
  path: getRoot('dist/desktop'),
  filename: 'desktop.js'
},

module: { 
  rules: [
      {test: /\.[tj]sx?$/, exclude: /node_modules/, use: ["babel-loader"]}, 
      ]
},
    
resolve: { 
      extensions: [".ts", ".js", ".tsx", ".jsx", ".json", ".scss", ".css", ".html"],
      mainFields: ['browser','module','jsnext:main','main'],
      //modules: [getRoot("src"), getRoot("node_modules")]
},
    
//devtool: "#source-map",
    
node: {
      __dirname: false,
      __filename: false
},

externals: [nodeExternals()],

plugins: [new CleanWebpackPlugin('dist')]

}

module.exports = desktopConfig

      //new ExecaPlugin(({onBuildEnd: [{args: ["."], cmd: "electron", stdio: 'inherit'}]})) 