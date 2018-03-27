var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');




var applicationEntries = []

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js',
  },

  devtool: '#source-map',


  resolve: {
    extensions: ['.webpack.js','.web.js','.tsx','.ts','.js','.json'],
  },

  plugins: [
    new HtmlWebpackPlugin({template: 'src/index.html',inject: 'body'}),
    new CopyWebpackPlugin([{ from: 'src/favicon.png' },])
  ],

  devServer: {
    historyApiFallback: { index: '/' },
  },

module: {
    rules: [
 {
  test: /\.tsx?$/,
  loader: 'awesome-typescript-loader',
  exclude: /node_modules/,
},

{
  test: /\.html$/,
  loader: 'raw-loader',
  exclude: /node_modules/,
},

{
  test: /\.css$/,
  loader: 'style-loader!css-loader',
},
{
  test: /\.scss$/,
  loader: 'style-loader!css-loader!sass-loader',
  exclude: /node_modules/,
},
{
  test: /\.json$/,
  loader: 'json-loader',
},
{
  test: /\.svg(\?v=\d+\.\d+\.\d+|\?wi2r8m)?$/,
  loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
},
{
  test: /\.eot(\?v=\d+\.\d+\.\d+|\?wi2r8m)?$/,
  loader: 'file-loader',
},
{
  test: /\.(woff|woff2|woff(\?wi2r8m)|woff2(\?wi2r8m))$/,
  loader: 'url-loader?prefix=font/&limit=5000',
},
{
  test: /\.ttf(\?v=\d+\.\d+\.\d+|\?wi2r8m|\?v=\d+\.\d+)?$/,
  loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
},
 {
  test: /\.png$/,
  loader: 'url-loader',
  query: { mimetype: 'image/png' },
},
{
  test: /\.gif$/,
  loader: 'url-loader',
  query: { mimetype: 'image/gif' },
}

]},

externals: {
    'react/lib/ReactContext': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
  },
};
