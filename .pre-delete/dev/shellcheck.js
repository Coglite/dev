var shell = require('shelljs')

var pythonCheck = shell.which('python')
var jupyterCheck = shell.which('jupyter')

var pythonExecPath = pythonCheck.stdout
var jupyterExecPath = jupyterCheck.stdout
console.log(pythonExecPath)
console.log(jupyterExecPath)