var StatsPlugin = require("stats-webpack-plugin")
module.exports = {
    type: 'react-app',
    webpack: {

        extra: {
        node: {
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        },
            plugins: [
                new StatsPlugin('stats.json', {
                    chunkModules: true
                })
            ],
        },

        publicPath: ''
    },
    babel: {
        stage: 1,
        // cherryPick: 'lodash',
        // runtime: false,
        // presets: [["env", {
        //     loose: true,
        //     targets: {
        //         chrome: 59
        //     }
        // }]]
    }
}