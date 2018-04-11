
var path = require('path');
var chalk = require('chalk');
var fs = require('fs');

function CheckBuildsExist() {
  const mainPath = path.join(__dirname, '..', '..', 'app', 'main.prod.js');
  const rendererPath = path.join(__dirname, '..', '..', 'app', 'dist', 'renderer.prod.js');

  if (!fs.existsSync(mainPath)) {
    throw new Error(chalk.white.bgRed.bold(
      'The main process is not built yet. Build it by running "npm run build-main"',
    ));
  }

  if (!fs.existsSync(rendererPath)) {
    throw new Error(chalk.white.bgRed.bold(
      'The renderer process is not built yet. Build it by running "npm run build-renderer"',
    ));
  }
}

CheckBuildsExist();
