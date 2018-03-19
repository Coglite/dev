const path = require('path')
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const ROOT = path.resolve(__dirname, "..");
const getRoot = path.join.bind(path, ROOT);

module.exports = env => { return {

entry: { 
  desktop: getRoot("src/desktop/main.ts"),
  app: getRoot("src/app/app.tsx")
},

output: {
  filename: "[name].js",
  path: path.resolve(__dirname, "../dist")
 },

mode: `${env}`,

target: "node",

node: {__dirname: false,__filename: false},

externals: [nodeExternals()],

resolve: {
  extensions: [".ts", ".js", ".tsx", ".jsx", ".json", ".scss", ".css", ".html"]
},

devtool: "#source-map",

module: {
  rules: [
    {test: /\.[tj]sx?$/,use: ["babel-loader"]},
    {test: /\.less$/,use: ["style-loader", "css-loader", "less-loader"]},
    {test: /\.scss$/,use: ["style-loader","css-loader","sass-loader"]},
    {test: /\.css$/,use: ["style-loader", "css-loader"]},
    {test: /\.(ttf2?|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,loader: "file-loader"},
    {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,loader: "url-loader?limit=10000&mimetype=application/font-woff"},
  ]
},

plugins: [
    new FriendlyErrorsWebpackPlugin({ clearConsole: env === "development" }),
    new CopyPlugin([{from: 'src/app/app.html', to: ""}]),
    new CleanWebpackPlugin('dist', {root: getRoot()})
    ]
  };
};
