var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ROOT = path.resolve(__dirname, '..');
const getRoot = path.join.bind(path, ROOT);



const appConfig = {

  target: 'electron-renderer',

  entry: {Index: [getRoot('src/app/index.tsx')]},

  output: {
    path: getRoot('build'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {test: /\.[tj]sx?$/, include: getRoot('src/app'), loader: 'ts-loader', options: { transpileOnly: true }},
      {test: /\.less$/,use: ["style-loader", "css-loader", "less-loader"]},
      {test: /\.scss$/,use: ["style-loader","css-loader","sass-loader"]},
      {test: /\.css$/,use: ["style-loader", "css-loader"]},
      {test: /\.(ttf2?|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,loader: "file-loader"},
      {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,loader: "url-loader?limit=10000&mimetype=application/font-woff"}, 
      ],
  },

  resolve: {extensions: ['.ts', '.tsx', '.js', '.jsx', '.html', '.json', '.less', '.css']},

  plugins: [
      new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
      new HtmlWebpackPlugin({template: getRoot("src/app/index.html")})
  ]

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