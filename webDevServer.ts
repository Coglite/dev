const express = require('express');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.app');
const app = express();

const compiler = webpack(config);



app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    //hot: true,
    stats: {colors: true},
}));
  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(require("webpack-hot-middleware")(compiler, {
    reload: true
  }));





app.use('/api', function(req, res) {
    res.header("Content-Type",'application/json');
    res.sendFile(path.join(__dirname, './api/elf.json'));  
});

app.listen(8888, () => {
    console.log('start listen on 8888')
})