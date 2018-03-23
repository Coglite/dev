var webpack = require('webpack');
var path = require('path');

const isProduction = process.env['NODE_ENV'] === 'production'? true : false;

// plugins
const CleanWebpackPlugin = require('clean-webpack-plugin')
const nodeExternals = require("webpack-node-externals");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig =
{
mode: 'development',
output:
  {
    path: path.join(__dirname, 'dist'),
    pathinfo: true,
    filename: '[name].js',
    publicPath: ''
  },
resolve:
  { 
    extensions: [".ts", ".tsx", ".js"],
    mainFields: ['module', 'browser', 'main'], //req for antd
  },

//devtool: "eval",

node: 
  {
    __dirname: false,
    __filename: false
  },

//nodeExternals({ whitelist: [/\.css$/] })
externals: [nodeExternals()]
};


const appConfig = Object.assign(
  {
    target: "electron-renderer",
    entry: {app: ["./src/app/index.tsx"]},
    module: {
      rules: [
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {test: /\.css$/,loader: 'style-loader!css-loader!postcss-loader'},
      { 
        test: /\.[tj]sx?$/, 
        include: path.join(__dirname, 'src/app'),
        use: [{loader: 'ts-loader'}],
        exclude: /node_modules/
      },
      {test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,loader: 'file-loader',},
      {test: /\.html$/, use: 'html-loader' },
      ]
    },
    plugins:
      [
        //new webpack.HotModuleReplacementPlugin(),
       // new ExtractTextPlugin({filename: 'styles.css'}), // disable: !isProduction
        new HtmlWebpackPlugin({template: 'src/app/index.html'}),
        new CleanWebpackPlugin('dist')
      ],
  
 }, 
 commonConfig
);

const desktopConfig =
 Object.assign(
  {
    target: "electron-main",
    entry: {desktop: "./src/desktop/main.ts"},
    module: { 
      rules:
      [
        {test: /\.[tj]sx?$/,
        include: path.join(__dirname, 'src/desktop'),
        loader: "ts-loader", options: { transpileOnly: !isProduction }}
      ]
    }
  }, 
  commonConfig
);

module.exports = [desktopConfig, appConfig];


