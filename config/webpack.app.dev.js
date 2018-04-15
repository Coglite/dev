const webpack = require('webpack');
const merge = require('webpack-merge');
const appConfig = require("./webpack.app");
var cp = require('child_process')

const mergeStrategy = merge.strategy({ entry: "prepend" });

module.exports = mergeStrategy(appConfig, {
    mode: 'development',
    
    entry: Object.keys(appConfig.entry).reduce((o, k) => {
        o[k] = ['react-hot-loader/patch'];
        return o;
    }, {}),

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    
    devServer: {
        contentBase: appConfig.output.path,
        publicPath: '/',
        historyApiFallback: true,
        hot: true,
        stats: {
			colors: true,
			chunks: false,
			children: false
		},
        after() {
			cp.spawn("electron", ["."], {
				shell: true,
				env: process.env,
				stdio: "inherit"
			})
				.on("close", code => process.exit(0))
				.on("error", spawnError => console.log(spawnError));
		}

    }
});
