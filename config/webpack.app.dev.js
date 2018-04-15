const webpack = require('webpack');
const merge = require('webpack-merge');
const appConfig = require("./webpack.app");

const mergeStrategy = merge.strategy({ entry: "prepend" });

module.exports = mergeStrategy(appConfig, {
    mode: 'development',
    
    entry: Object.keys(appConfig.entry).reduce((o, k) => {
        o[k] = ['react-hot-loader/patch'];
        return o;
    }, {}),

    devServer: {
        contentBase: appConfig.output.path,
        publicPath: '/',
        historyApiFallback: true,
        hot: true,
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
});
