const { spawn } = require('child_process');
const { CSSResourcePlugin, CSSPlugin, EnvPlugin, FuseBox, QuantumPlugin, SassPlugin, Sparky, CopyPlugin } = require('fuse-box');


let isProduction = false;

const OUTPUT_DIR = "dist"
const ASSETS = ["*.jpg", "*.png", "*.jpeg", "*.gif", "*.svg"]

let VENDOR_CSS = [
  "node_modules/@blueprintjs/core/lib/css/blueprint.css",
  //"node_modules/antd/dist/antd.css"
]

Sparky.task("copy-html", () => Sparky
    .src("src/app/index.html")
    .dest("build/app/$name"));

Sparky.task("copy-external-css", () => Sparky
    .src(VENDOR_CSS)
    .dest("build/app/assets/css/$name"));

Sparky.task("copy-desktop-assets", () => Sparky.src("**/*.ttf", { base: "src/desktop/assets" }).dest("build/desktop/assets"));
Sparky.task("copy-app-assets", () => Sparky.src("**/*.ttf", { base: "src/app/assets" }).dest("build/app/assets"));


Sparky.task(
    "build:desktop",
    ["copy-desktop-assets"],
    () => {
        const fuse = FuseBox.init({
            homeDir: "src/desktop",
            output: "build/desktop/$name.js",
            target: "server@esnext",
            useTypescriptCompiler : true,
            cache: !isProduction,
            plugins: [
                EnvPlugin({ NODE_ENV: isProduction ? "production" : "development" }),
                isProduction && QuantumPlugin({
                    bakeApiIntoBundle: "desktop",
                    target: "server@esnext",
                    treeshake: true,
                    uglify: true,
                }),
            ],
        });

        const bundle = fuse
            .bundle("desktop")
            .target("server")
            .instructions("> [main.ts]");

        if (!isProduction) {
            bundle.watch();

            return fuse.run().then(() => {
                spawn('electron',[".", "--colors"],{ shell: true, stdio: "inherit" })
                .on('exit', () => process.exit(0))
            });
        }

        return fuse.run();
    });

Sparky.task(
    "build:app",
    ["copy-html", "copy-external-css", "copy-app-assets"],
    () => {
        const fuse = FuseBox.init({
            homeDir: "src/app",
            output: "build/app/$name.js",
            target: "electron@esnext",
            useTypescriptCompiler : true,
            cache: !isProduction,
            plugins: [
                EnvPlugin({ NODE_ENV: isProduction ? "production" : "development" }),
                [/node_modules.*\.css$/,SassPlugin(), CSSResourcePlugin({inline: true}),CSSPlugin()],
                isProduction && QuantumPlugin({
                    bakeApiIntoBundle: "app",
                    target: "electron@esnext",
                    treeshake: true,
                    uglify: true,
                }),
            ],
        });

        if (!isProduction) {fuse.dev({port: 9696, httpServer: false,})}

        const bundle = fuse
            .bundle("app")
            .target("electron")
            .instructions("> [index.tsx] + fuse-box-css")
            .plugin(CopyPlugin({ useDefault: false, files: ASSETS, dest: "assets", resolve: "assets/" }));

        if (!isProduction) {
            bundle
            .plugin([SassPlugin({importer: true}), CSSPlugin()])
            .plugin(CSSPlugin())
            .watch()
            .hmr();
        }

        bundle.plugin([
            SassPlugin({importer: true,macros: { "$home": "src/app/styles/" }}),
            CSSPlugin({group: "styles.css", outFile: "build/app/styles.css"})
            ]);

        return fuse.run();
    });


Sparky.task("clean:build", () => Sparky.src("build/*").clean("build/"));
Sparky.task("clean:cache", () => Sparky.src(".fusebox/*").clean(".fusebox/"));
Sparky.task("default", ["clean:build", "clean:cache", "build:app", "build:desktop"], () => { });

Sparky.task("set-prod-env", () => isProduction = true);
Sparky.task("build:production", ["set-prod-env", "default"], () => { });
