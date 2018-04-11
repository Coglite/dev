var webpack  = require('webpack');
var merge  = require('webpack-merge');
var BabiliPlugin  = require('babili-webpack-plugin');
const { BundleAnalyzerPlugin }  = require('webpack-bundle-analyzer');
var baseConfig  = require('./webpack.config.base');


module.exports = merge.smart(baseConfig, {
  devtool: 'eval',

  target: 'electron-main',

  entry: './app/main.dev',

  // 'main.js' in root
  output: {
    path: __dirname,
    filename: './app/main.prod.js',
  },

  plugins: [
    new BabiliPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
      openAnalyzer: process.env.OPEN_ANALYZER === 'true',
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      'process.env.DEBUG_PROD': JSON.stringify(process.env.DEBUG_PROD || 'false'),
    }),
  ],

  node: {
    __dirname: false,
    __filename: false,
  },
});
