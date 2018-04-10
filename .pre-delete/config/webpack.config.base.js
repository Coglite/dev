const webpack = require("webpack");
const helpers = require("./helpers");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { commonRules } = require("./webpack.common");


const isDevServer = helpers.isWebpackDevServer();
const AOT = !isDevServer;
const METADATA = {
    baseUrl: "/",
    isDevServer: isDevServer,
    AOT,
};

const baseConfig = {
    entry: {
        "polyfills": helpers.root("src/app/polyfills"),
        "app": helpers.root("src/app/index.tsx")
    },

    resolve: {
        extensions: [".ts",".tsx", ".js", ".json", ".scss", ".css", ".html"],
        modules: [helpers.root(), helpers.root("src"), helpers.root("node_modules")],
    },

    module: {
        rules: [
            {test: /\.[tj]sx?$/, loader: "ts-loader", options: { transpileOnly: true }},
            ...commonRules,
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            //{ context: "src/client/splash-screen", from: "**/*", to: "client/splash-screen" },
            //{ context: "src/client/proxy", from: "**/*", to: "client/proxy" },
            { context: "src/app/assets", from: "**/*", to: "app/assets" },
            { from: "node_modules/monaco-editor/min/vs", to: "app/vendor/vs", },
        ]),
        new HtmlWebpackPlugin({
            template: "src/app/index.html",
            //chunksSortMode: "dependency",
            inject: "body",
            metadata: METADATA,
        }),
        // Workaround for WARNING Critical dependency: the request of a dependency is an expression
        new webpack.ContextReplacementPlugin(/ajv(\\|\/)lib/, __dirname),
        new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/, __dirname),
        new webpack.ContextReplacementPlugin(/encoding/, __dirname),
        new webpack.LoaderOptionsPlugin({debug: true}),
    ],
    target: "electron-renderer",
};

module.exports = baseConfig;
