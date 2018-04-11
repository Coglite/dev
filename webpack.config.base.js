var path = require('path');
var  webpack = require('webpack');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        }, {
          loader: 'ts-loader',
          options: {
            happyPackMode: true
          },
        }]
      }],
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'renderer.dev.js',
    libraryTarget: 'commonjs2',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [
      path.join(__dirname, 'app'),
      'node_modules',
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN || ''),
      // eslint-disable-next-line global-require
      'process.env.VERSION': JSON.stringify(require('./package.json').version || ''),
    }),

    new webpack.NamedModulesPlugin(),
  ],
};
