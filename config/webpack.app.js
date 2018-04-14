var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var cp = require('child_process')
const WriteFilePlugin = require("write-file-webpack-plugin");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var nodeExternals = require("webpack-node-externals");



const ROOT = path.resolve(__dirname, '..');
const getRoot = path.join.bind(path, ROOT);


const HTML_METADATA = {};


const appConfig = {

mode: "development",

target: 'electron-renderer',

entry: [getRoot('src/app/index')],

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
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.html', '.json'],
    mainFields: ['browser','module','jsnext:main','main'],
    //modules: ["src", "node_modules"]
},

plugins: [
      new HtmlWebpackPlugin({
        template: getRoot("src/app/index.html"),
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
    }),
    //new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}})
],

node: {fs: 'empty',
      __dirname: false,
      __filename: false
},

externals: [nodeExternals()],

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


const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({ filename: "[name].css" });

    {test: /\.scss$/,use: extractSass.extract({
                    use: [
                        {loader: "css-loader",options: { minimize: true }},
                        {loader: "sass-loader",options: { includePaths: ["node_modules"] }}
                    ]})
            },
    {test: /\.css$/,use: extractSass.extract({ use: [{ loader: "css-loader" }] })},

} */