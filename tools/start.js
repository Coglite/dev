const execa = require('execa')
const electron = require("electron");
const webpack = require("webpack");
const config = require("../webpack.config");

const env = "development";

const compiler = webpack(config);
let electronStarted = false;

const watching = compiler.watch({}, (err, stats) => {
  if (!err && !stats.hasErrors() && !electronStarted) {
    electronStarted = true;

    execa
      (electron, ["."], { stdio: "inherit" })
      .on("close", () => {
        watching.close();
        //elecronStarted = false;
      });
  }
});
