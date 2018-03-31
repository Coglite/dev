import * as path from 'path'
import * as webpack from 'webpack'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as cp from 'child_process'
import * as nodeExternals from "webpack-node-externals";
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
 
const ROOT = path.resolve(__dirname);
const getRoot = path.join.bind(path, ROOT);


export const desktopConfig: webpack.Configuration = { 
    target: "electron-main",   
    mode: 'development',
    entry: getRoot('src/desktop/main.ts'),
    output: {
     path: getRoot('dist/desktop'),
     filename: 'desktop.js'
     },
    module: { rules: [
      {test: /\.[tj]sx?$/, exclude: /node_modules/, use: ["babel-loader"]}, 
      ]},
    
    resolve: { 
      extensions: [".ts", ".js", ".tsx", ".jsx", ".json", ".scss", ".css", ".html"],
      mainFields: ['browser','module','jsnext:main','main'],
      //modules: [getRoot("src"), getRoot("node_modules")]
     },
    
    devtool: "#source-map",
    
    node: {
      __dirname: false,
      __filename: false
    },
    externals: [nodeExternals()],

    plugins: [new CleanWebpackPlugin('dist')]
  }

module.exports = desktopConfig