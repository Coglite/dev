import * as path from 'path'
import * as webpack from 'webpack'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as cp from 'child_process'

const ROOT = path.resolve(__dirname);
const getRoot = path.join.bind(path, ROOT);
const SRC = getRoot('src')



const appConfig: webpack.Configuration = {
  //dont target electron-renderer bc it fucks up
  mode: "development",
  entry: ['webpack-hot-middleware/client', getRoot('src/app/app')],
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist/app'),
    filename: 'app.js',
  },
  module: {
    rules: [
    {test: /\.tsx?$/,use: ['babel-loader']},
    {test: /\.less$/,use: ["style-loader", "css-loader", "less-loader"]},
    {test: /\.scss$/,use: ["style-loader","css-loader","sass-loader"]},
    {test: /\.css$/,use: ["style-loader", "css-loader"]},
    {test: /\.(ttf2?|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,loader: "file-loader"},
    {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,loader: "url-loader?limit=10000&mimetype=application/font-woff"},
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    mainFields: ['browser','module','jsnext:main','main'],
    //modules: ["src", "node_modules"]
  },
  plugins: [
      new HtmlWebpackPlugin({template: "src/app/app.html"}),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      //new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}})
],

  stats: {
    modules: false,
    chunkModules: false,
    chunks: false,
    children: false
  }

/*devServer: {
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
}






module.exports = appConfig