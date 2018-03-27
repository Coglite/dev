import * as path from 'path'
import * as express from 'express'
var app = express();
const { initializeMessageHandler } = require('./messageHandler');
var createWebpackDevServer = require('./webpackServer');
var  serverApp = require('http').Server(app);
var argv = require('minimist')(process.argv.slice(2));
const port = argv.port ? argv.port : 3000;
const webpackDevServerPort = argv.webpackPort ? argv.webpackPort : 4000;

initializeMessageHandler(serverApp, webpackDevServerPort);


serverApp.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

app.use(express.static('../editor/dist'))
