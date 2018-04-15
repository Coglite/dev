var path = require('path')
var webpack = require('webpack')
var nodeExternals = require("webpack-node-externals");
var CleanWebpackPlugin = require('clean-webpack-plugin');


const ROOT = path.resolve(__dirname, '..');
const getRoot = path.join.bind(path, ROOT);

const DESKTOP_SRC = path.resolve(__dirname, '..', 'src/desktop');
const COMMON_SRC = path.resolve(__dirname, '..', 'src/common')
const DESKTOP_OUT_PATH = path.resolve(__dirname, '..', 'build');



const desktopConfig = {

target: "electron-main",   

mode: process.env.NODE_ENV || 'development',

entry: {main: DESKTOP_SRC + '/main.ts'},

output: {
  path:  DESKTOP_OUT_PATH,
  filename: 'desktop.js'
},


module: {
  rules: [
    {test: /\.ts$/, include: [DESKTOP_SRC, COMMON_SRC], loader: 'ts-loader', options: { transpileOnly: true }}
  ]},

resolve: {extensions: ['.js', '.json', '.ts']},

plugins: [new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})],

//externals: [nodeExternals()]
}

module.exports = desktopConfig


//new ExecaPlugin(({onBuildEnd: [{args: ["."], cmd: "electron", stdio: 'inherit'}]})) 

