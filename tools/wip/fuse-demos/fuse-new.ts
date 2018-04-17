const path = require("path")
const fsbx = require("fuse-box")
import { Sparky } from "fuse-box"

const resolveId = require("postcss-import/lib/resolve-id")

const POSTCSS_PLUGINS = [
  require("postcss-import")({
    root: path.join(__dirname, "src"),
    resolve: (id, base, options) => resolveId(id, options.root, options),
  }),
  require("postcss-cssnext")({ browsers: ["ie >= 11", "last 2 versions"] }),
]

const fuse = fsbx.FuseBox.init({
  homeDir: "./src",
  outFile: "./dist/bundle.js",
  cache: true,
  plugins: [
    [/\.component\.css$/, fsbx.PostCSS(POSTCSS_PLUGINS), fsbx.RawPlugin(["**/*.component.css"])],
    [
      /base\.css$/,
      fsbx.PostCSS(POSTCSS_PLUGINS),
      fsbx.CSSPlugin({ group: "all.css", outFile: "./dist/all.css", inject: () => "all.css" }),
    ],
  ],
})

fuse.bundle(">index.ts")

Sparky.task("sass", async () => {
  return Sparky.src(["src/app/**/*.scss"])
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(concat("styles.css"))
    .pipe(
      postcss([
        require("postcss-discard-duplicates"),
        require("postcss-csso")({ restructure: true }),
      ]),
    )
    .pipe(gulp.dest("src/app/"))
})
