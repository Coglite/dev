const path = require('path');
const webpack = require('webpack');


const ROOT = path.resolve(__dirname, '..');
const getRoot = path.join.bind(path, ROOT);

module.exports = {
  mode: 'development',
  entry: {
    vendor: ['moment']
  },
  output: {
    path: path.join(__dirname, '..', 'build', 'dll'),
    filename: 'dll.[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(__dirname, '..', 'build', 'dll', '[name]-manifest.json'),
      name: '[name]'
    })
  ]
};