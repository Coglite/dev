var path = require('path')
const ROOT = path.resolve(__dirname, '..');
const getRoot = path.join.bind(path, ROOT);

module.exports = {getRoot}