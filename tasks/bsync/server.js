import gulp from 'gulp'
import BSync from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

let webpackConfig = {
    entry: './main.js',
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, '../site')
    },
    context: path.resolve(__dirname, '../site')
}

function scripts() {
    return new Promise(resolve => webpack(config, (err, stats) => {
        if (err) console.log('Webpack', err)
        console.log(stats.toString({ /* stats options */ }))
        resolve()
    }))
}


const browserSync = BSync.create()
const bundler = webpack(webpackConfig)

export function server() {
    let config = {
        server: 'site',
        middleware: [
            webpackDevMiddleware(bundler, { /* options */ }),
            webpackHotMiddleware(bundler)
        ],
    }
    browserSync.init(config)
    gulp.watch('site/*.js').on('change', () => browserSync.reload())
}

export const dev   = gulp.series( server )
export const build = gulp.series( scripts )

export default dev