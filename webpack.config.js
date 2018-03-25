var webpack = require('webpack');
var path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin')
const nodeExternals = require("webpack-node-externals");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = {

mode: 'development',

output: {
    path: path.join(__dirname, 'dist'),
    pathinfo: true,
    filename: '[name].js',
    publicPath: ''
  },

resolve:{ 
    extensions: [".ts", ".tsx", ".js"],
    mainFields: ['module', 'browser', 'main'],
  },

devtool: "#eval",

node: {__dirname: false,  __filename: false},

externals: [nodeExternals()]

};


const appConfig = Object.assign({

target: "electron-renderer",

entry: {app: ["./src/app/index.tsx"]},

module: { rules: [
      {enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {test: /\.css$/,loader: 'style-loader!css-loader!postcss-loader'},
      {test: /\.[tj]sx?$/, 
          include: path.join(__dirname, 'src/app'),
          use: [{loader: 'ts-loader'}],
          exclude: /node_modules/},
      {test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,loader: 'file-loader',},
      {test: /\.html$/, use: 'html-loader' },
      {test: /\.json$/,loader: "json-loader"},
  ]},

plugins:[
  new HtmlWebpackPlugin({template: 'src/app/index.html'}),
  new CleanWebpackPlugin('dist')
  ]
 },
 commonConfig
);


const desktopConfig = Object.assign({

target: "electron-main",

entry: {desktop: "./src/desktop/main.ts"},

module: { 
      rules:[
        {test: /\.[tj]sx?$/, include: path.join(__dirname, 'src/desktop'), loader: "ts-loader"}
    ]}
}, 
commonConfig
);


module.exports = [desktopConfig, appConfig];







/*loader: "ts-loader" , options: { transpileOnly: !isProduction } }
externals: [nodeExternals({ whitelist: [/\.css$/] }]
plugins:
      [
        //new webpack.HotModuleReplacementPlugin(),
       // new ExtractTextPlugin({filename: 'styles.css'}), // disable: !isProduction
 */