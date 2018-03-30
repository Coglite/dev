var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var enableDestroy = require('server-destroy');

let app = null;
let serverApp = null;

export function createWebpackDevServer(config, port) {
    serverApp && serverApp.destroy();
    app = express();
    serverApp = require('http').Server(app);

    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: '.',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    serverApp.listen(port, '0.0.0.0', function onStart(err) {
        if (err) {
            console.log(err);
        }
        console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
    });

    enableDestroy(serverApp);
    return serverApp;
}

