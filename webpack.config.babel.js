import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const appConfig = {
  mode: "development",
  entry: ['./src/app/app'],
  output: {
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
    //mainFields: ['browser','module','jsnext:main','main'],
    //modules: ["src", "node_modules"]
  },
  plugins: [new HtmlWebpackPlugin({template: "src/static/html/app.html"}), new webpack.NamedModulesPlugin()]
}

module.exports = appConfig