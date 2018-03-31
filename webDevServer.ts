
const path = require('path');
const webpack = require('webpack');

const express = require('express');
const config = require('./webpack.app');
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {colors: true},
}));
    
  app.use(require("webpack-hot-middleware")(compiler, {
    reload: true
}));



const execa = require('execa')
const electron = require("electron");
const desktopConfig = require("./webpack.desktop");

const env = "development";
const desktopCompiler = webpack(desktopConfig);
let electronStarted = false;
const watching = desktopCompiler.watch({}, (err, stats) => {


  if (!err && !stats.hasErrors() && !electronStarted) {
    electronStarted = true;
    execa(electron, ["."], { stdio: "inherit" })
      .on("close", () => {
        watching.close();
        process.kill(process.pid);
      });
  }
});




app.use('/api', function(req, res) {
    res.header("Content-Type",'application/json');
    res.sendFile(path.join(__dirname, './api/elf.json'));  
});

app.listen(8888, () => {
    console.log('start listen on 8888')
})

