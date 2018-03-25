const execa = require('execa')
var cp = require('child_process')
const electron = require("electron");
const webpack = require("webpack");
const config = require("../webpack.config");

const env = "development";

const compiler = webpack(config);
let electronStarted = false;

const watching = compiler.watch({}, (err, stats) => {
  if (!err && !stats.hasErrors() && !electronStarted) {
    electronStarted = true;

    cp.spawn(electron, ["."], { stdio: "inherit" })
      .on("close", () => {
        watching.close();
        //elecronStarted = false;
      });
  }
});
