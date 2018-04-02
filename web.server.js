
var path = require('path')
var webpack = require('webpack')

var express = require('express');
const config = require('./webpack.app');
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    stats: {
        chunks: false,
        modules: false,
        children: false,
        colors: true
        },
}));
    
app.use(require("webpack-hot-middleware")(compiler));


app.use('/api', function(req, res) {
    res.header("Content-Type",'application/json');
    res.sendFile(path.join(__dirname, './api/elf.json'));  
});

app.listen(8888, () => {
    console.log('start listen on 8888')
})

var execa = require('execa')
var electron = require("electron")
var desktopConfig = require("./webpack.desktop")


const desktopCompiler = webpack(desktopConfig);
let electronStarted = false;
const watching = desktopCompiler.watch({}, (err, stats) => {

  if (!err && !stats.hasErrors() && !electronStarted) {
    electronStarted = true;
    execa(electron, ["."], { stdio: "inherit" })
      .on("close", () => {
        watching.close();
        process.exit(0);
      });
  }
});
