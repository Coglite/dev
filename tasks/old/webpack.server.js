var path = require('path')
var fs = require('fs')

const {getRoot} = require('./helpers')

var nodeModules = fs.readdirSync(getRoot('node_modules'))
  .filter(module => module !== '.bin')
  .reduce((prev, module) => Object.assign(prev, {[module]: 'commonjs ' + module}), {})

module.exports = {
  mode: 'development',
  entry: [getRoot('src/server/server.js')],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js'
  },
  target: 'node',
  module: {
    loaders: [
      {test: /\.[tj]sx?$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  node: {
    console: false,
    process: false,
    global: false,
    buffer: false,
    __filename: false,
    __dirname: false
  },
  externals: nodeModules
}