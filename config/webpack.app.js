var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var cp = require('child_process')
const WriteFilePlugin = require("write-file-webpack-plugin");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const ROOT = path.resolve(__dirname, '..');
const getRoot = path.join.bind(path, ROOT);
//const SRC = getRoot('src')


const HTML_METADATA = {};


//dont target electron-renderer bc it fucks up
const appConfig = {

mode: "development",

entry: ['webpack-hot-middleware/client', getRoot('src/app/app')],

output: {
    publicPath: '/',
    path: getRoot('build/app'),
    filename: 'app.js',
},

module: {
  rules: [
    {test: /\.[tj]sx?$/, exclude: /node_modules/, use: ['babel-loader']},
    {test: /\.less$/,use: ["style-loader", "css-loader", "less-loader"]},
    {test: /\.scss$/,use: ["style-loader","css-loader","sass-loader"]},
    {test: /\.css$/,use: ["style-loader", "css-loader"]},
    {test: /\.(ttf2?|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,loader: "file-loader"},
    {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,loader: "url-loader?limit=10000&mimetype=application/font-woff"},
    ],
  },
resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.html'],
    mainFields: ['browser','module','jsnext:main','main'],
    //modules: ["src", "node_modules"]
},
plugins: [
      new HtmlWebpackPlugin({
        template: getRoot("src/app/app.html"),
        inject: "body",
        metadata: HTML_METADATA,
        }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new WriteFilePlugin(),
      new AddAssetHtmlPlugin({
      filepath: require.resolve('../build/dll/dll.vendor'),
      includeSourcemap: false
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: getRoot('build/dll/vendor-manifest.json'),
      //manifest: require('./build/dll/vendor-manifest.json'),
      extensions: ['.js']
    })
      //new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}})
],
}

module.exports = appConfig


/*
devServer: {
		contentBase: path.join(__dirname, 'dist/app'),
		stats: {
			colors: true,
			chunks: false,
			children: false
		},
		after() {
			cp.spawn("electron", ["."], {
				shell: true,
				env: process.env,
				stdio: "inherit"
			})
				.on("close", code => process.exit(0))
				.on("error", spawnError => console.log(spawnError));
		}
} */