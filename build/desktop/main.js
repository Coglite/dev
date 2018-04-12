/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/desktop/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common/extensions/array.ts":
/*!****************************************!*\
  !*** ./src/common/extensions/array.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("if (!Array.prototype.first) {\r\n    Array.prototype.first = function () {\r\n        return this[0];\r\n    };\r\n}\r\nif (!Array.prototype.last) {\r\n    Array.prototype.last = function () {\r\n        return this[this.length - 1];\r\n    };\r\n}\r\nif (!Array.prototype.flatten) {\r\n    Array.prototype.flatten = function () {\r\n        return [].concat(...this);\r\n    };\r\n}\r\nif (!Array.prototype.sortBy) {\r\n    Array.prototype.sortBy = function (attr) {\r\n        return this.sort((a, b) => {\r\n            const aAttr = attr(a);\r\n            const bAttr = attr(b);\r\n            if (aAttr < bAttr) {\r\n                return -1;\r\n            }\r\n            else if (aAttr > bAttr) {\r\n                return 1;\r\n            }\r\n            else {\r\n                return 0;\r\n            }\r\n        });\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack:///./src/common/extensions/array.ts?");

/***/ }),

/***/ "./src/common/extensions/index.ts":
/*!****************************************!*\
  !*** ./src/common/extensions/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__webpack_require__(/*! moment-duration-format */ \"moment-duration-format\");\r\n__webpack_require__(/*! ./array */ \"./src/common/extensions/array.ts\");\r\n__webpack_require__(/*! ./observable */ \"./src/common/extensions/observable.ts\");\r\n__webpack_require__(/*! ./string */ \"./src/common/extensions/string.ts\");\r\n\n\n//# sourceURL=webpack:///./src/common/extensions/index.ts?");

/***/ }),

/***/ "./src/common/extensions/observable.ts":
/*!*********************************************!*\
  !*** ./src/common/extensions/observable.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst rxjs_1 = __webpack_require__(/*! rxjs */ \"rxjs\");\r\nif (!rxjs_1.Observable.prototype.cascade) {\r\n    rxjs_1.Observable.prototype.cascade = function (callback) {\r\n        const subject = new rxjs_1.AsyncSubject();\r\n        this.take(1).subscribe({\r\n            next: (data) => {\r\n                const obs = callback(data);\r\n                if (!(obs instanceof rxjs_1.Observable)) {\r\n                    subject.next(obs);\r\n                    subject.complete();\r\n                    return;\r\n                }\r\n                obs.take(1).subscribe({\r\n                    next: (out) => {\r\n                        subject.next(out);\r\n                        subject.complete();\r\n                    },\r\n                    error: (e) => subject.error(e),\r\n                });\r\n            },\r\n            error: (e) => subject.error(e),\r\n        });\r\n        return subject.asObservable();\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack:///./src/common/extensions/observable.ts?");

/***/ }),

/***/ "./src/common/extensions/string.ts":
/*!*****************************************!*\
  !*** ./src/common/extensions/string.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("if (!String.prototype.format) {\r\n    String.prototype.format = function (...args) {\r\n        return this.replace(/{(\\d+)}/g, (match, i) => {\r\n            return typeof args[i] !== \"undefined\" ? args[i] : match;\r\n        });\r\n    };\r\n}\r\nif (!String.prototype.clearWhitespace) {\r\n    String.prototype.clearWhitespace = function () {\r\n        return this.replace(/\\s/g, \"\");\r\n    };\r\n}\r\nif (!String.prototype.padStart) {\r\n    String.prototype.padStart = function (maxLength, padString) {\r\n        padString = padString ? String(padString) : \" \";\r\n        if (padString.length === 0) {\r\n            padString = \" \";\r\n        }\r\n        const str = String(this);\r\n        const fillLen = maxLength - str.length;\r\n        if (fillLen > 0) {\r\n            const timesToRepeat = Math.ceil(fillLen / padString.length);\r\n            const truncatedStringFiller = padString\r\n                .repeat(timesToRepeat)\r\n                .slice(0, fillLen);\r\n            return truncatedStringFiller + str;\r\n        }\r\n        return str;\r\n    };\r\n}\r\nif (!String.prototype.trimEnd) {\r\n    String.prototype.trimEnd = function (...values) {\r\n        let input = String(this) || \"\";\r\n        while (input) {\r\n            const match = values.find((value) => {\r\n                return value && input.endsWith(value);\r\n            });\r\n            if (!match) {\r\n                break;\r\n            }\r\n            input = input.substr(0, input.length - match.length);\r\n        }\r\n        return input;\r\n    };\r\n}\r\nif (!String.prototype.contains) {\r\n    String.prototype.contains = function (substr) {\r\n        return this.indexOf(substr) !== -1;\r\n    };\r\n}\r\nif (!String.prototype.isBlank) {\r\n    String.prototype.isBlank = function () {\r\n        return (!this || /^\\s*$/.test(this));\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack:///./src/common/extensions/string.ts?");

/***/ }),

/***/ "./src/desktop/constants.ts":
/*!**********************************!*\
  !*** ./src/desktop/constants.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst electron_1 = __webpack_require__(/*! electron */ \"electron\");\r\nconst mkdirp = __webpack_require__(/*! mkdirp */ \"mkdirp\");\r\nconst net = __webpack_require__(/*! net */ \"net\");\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst path_1 = __webpack_require__(/*! path */ \"path\");\r\nconst os_1 = __webpack_require__(/*! os */ \"os\");\r\nvar jetpack = __webpack_require__(/*! fs-jetpack */ \"fs-jetpack\");\r\nconst APP_ROOT_DIR = jetpack.cwd(electron_1.app.getAppPath());\r\nconst packageConfig = APP_ROOT_DIR.read(\"package.json\", \"json\");\r\nconst apiUrl = 'http://localhost:3500';\r\nconst localDBname = 'coglite';\r\nconst cogliteDir = path_1.normalize(`${os_1.homedir()}/.coglite/`);\r\nconst uploadDir = path_1.normalize(`${os_1.homedir()}/.coglite/uploads/`);\r\nconst root = path.join(electron_1.app.getAppPath());\r\nconst portrange = 45032;\r\nfunction getPort(port = portrange) {\r\n    return new Promise((resolve, reject) => {\r\n        const server = net.createServer();\r\n        server.listen(port, (err) => {\r\n            server.once(\"close\", () => {\r\n                resolve(port);\r\n            });\r\n            server.close();\r\n        });\r\n        server.on(\"error\", (err) => {\r\n            getPort(port + 1).then((x) => {\r\n                resolve(x);\r\n            });\r\n        });\r\n    });\r\n}\r\nconst urls = {\r\n    main: {\r\n        dev: \"http://localhost:3178/index.html\",\r\n        prod: `file://${__dirname}/../../build/index.html`,\r\n    },\r\n    splash: {\r\n        dev: `file://${root}/src/server/splash-screen/splash-screen.html`,\r\n        prod: `file://${root}/build/server/splash-screen/splash-screen.html`,\r\n    },\r\n    recover: {\r\n        dev: `file://${root}/src/server/recover-window/recover-window.html`,\r\n        prod: `file://${root}/build/server/recover-window/recover-window.html`,\r\n    },\r\n    icon: __dirname + \"/../assets/images/icon.ico\",\r\n};\r\nconst isAsar = process.mainModule.filename.indexOf(\"app.asar\") !== -1;\r\nconst logsFolder = isAsar ? path.join(electron_1.app.getPath(\"userData\"), \"logs\") : path.join(root, \"logs\");\r\nconst resourcesFolder = isAsar ? path.normalize(path.join(root, \"..\")) : root;\r\nmkdirp.sync(logsFolder);\r\nconst pythonServerPort = {\r\n    dev: Promise.resolve(8765),\r\n    prod: getPort(),\r\n};\r\nconst customProtocolName = 'coglite';\r\nexports.Constants = {\r\n    isAsar,\r\n    isDev: !isAsar,\r\n    root,\r\n    urls,\r\n    logsFolder,\r\n    resourcesFolder,\r\n    pythonServerPort,\r\n    version: packageConfig.version,\r\n    customProtocolName\r\n};\r\n\n\n//# sourceURL=webpack:///./src/desktop/constants.ts?");

/***/ }),

/***/ "./src/desktop/core/application.ts":
/*!*****************************************!*\
  !*** ./src/desktop/core/application.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst os = __webpack_require__(/*! os */ \"os\");\r\nconst events_1 = __webpack_require__(/*! events */ \"events\");\r\nconst electron_1 = __webpack_require__(/*! electron */ \"electron\");\r\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/desktop/constants.ts\");\r\nconst logger_1 = __webpack_require__(/*! ../logger */ \"./src/desktop/logger/index.ts\");\r\nconst main_window_1 = __webpack_require__(/*! ./main-window */ \"./src/desktop/core/main-window.ts\");\r\nconst util_1 = __webpack_require__(/*! util */ \"util\");\r\nconst osName = `${os.platform()}-${os.arch()}/${os.release()}`;\r\nconst isDev = constants_1.Constants.isDev ? \"-dev\" : \"\";\r\nconst userAgent = `(${osName}) Coglite/${constants_1.Constants.version}${isDev}`;\r\nclass CogliteDesktopApp extends events_1.EventEmitter {\r\n    constructor() {\r\n        super(...arguments);\r\n        this.mainWindow = new main_window_1.MainWindow();\r\n    }\r\n    start() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            this.mainWindow.createWindow();\r\n        });\r\n    }\r\n    registerCoreServices() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            this._registerLifeCycleEventHandlers();\r\n            this._registerCustomProtocol();\r\n        });\r\n    }\r\n    _registerLifeCycleEventHandlers() {\r\n        electron_1.app.on(\"window-all-closed\", () => {\r\n            if (process.platform !== \"darwin\") {\r\n                electron_1.app.quit();\r\n            }\r\n        });\r\n        electron_1.app.on(\"activate\", () => {\r\n            if (util_1.isNullOrUndefined(this.mainWindow) === true) {\r\n                this.start();\r\n            }\r\n        });\r\n        electron_1.ipcMain.once(\"exit\", () => { process.exit(1); });\r\n        process.on(\"uncaughtException\", (error) => {\r\n            logger_1.logger.error(\"There was a uncaught exception\", error);\r\n        });\r\n        this.mainWindow.on(\"closed\", () => {\r\n            logger_1.logger.info(`Window ${this.constructor.name} closed. Quiting the app.`);\r\n            electron_1.app.quit();\r\n        });\r\n        electron_1.ipcMain.once(\"exit\", () => {\r\n            process.exit(1);\r\n        });\r\n        process.on(\"uncaughtException\", (error) => {\r\n            logger_1.logger.error(\"There was a uncaught exception\", error);\r\n        });\r\n        process.on(\"unhandledRejection\", r => {\r\n            logger_1.logger.error(\"Unhandled promise error:\", r);\r\n        });\r\n    }\r\n    _registerCustomProtocol() {\r\n        if (constants_1.Constants.isDev) {\r\n            return;\r\n        }\r\n        if (electron_1.app.setAsDefaultProtocolClient(constants_1.Constants.customProtocolName)) {\r\n            logger_1.logger.info(`Registered ${constants_1.Constants.customProtocolName}:// as a protocol for coglite desktop`);\r\n        }\r\n        else {\r\n            logger_1.logger.error(`Failed to register ${constants_1.Constants.customProtocolName}:// as a protocol for coglite desktop`);\r\n        }\r\n    }\r\n    quit() {\r\n        electron_1.app.quit();\r\n    }\r\n}\r\nexports.CogliteDesktopApp = CogliteDesktopApp;\r\n\n\n//# sourceURL=webpack:///./src/desktop/core/application.ts?");

/***/ }),

/***/ "./src/desktop/core/index.ts":
/*!***********************************!*\
  !*** ./src/desktop/core/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nfunction __export(m) {\r\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\r\n}\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__export(__webpack_require__(/*! ./subprocess */ \"./src/desktop/core/subprocess.ts\"));\r\n__export(__webpack_require__(/*! ./application */ \"./src/desktop/core/application.ts\"));\r\n__export(__webpack_require__(/*! ./smart-card-certificate */ \"./src/desktop/core/smart-card-certificate.ts\"));\r\n\n\n//# sourceURL=webpack:///./src/desktop/core/index.ts?");

/***/ }),

/***/ "./src/desktop/core/main-window.ts":
/*!*****************************************!*\
  !*** ./src/desktop/core/main-window.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst electron_1 = __webpack_require__(/*! electron */ \"electron\");\r\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/desktop/constants.ts\");\r\nconst events_1 = __webpack_require__(/*! events */ \"events\");\r\nconst devServerUrl = constants_1.Constants.urls.main.dev;\r\nconst buildFileUrl = constants_1.Constants.urls.main.prod;\r\nvar DesktopAppStatus;\r\n(function (DesktopAppStatus) {\r\n    DesktopAppStatus[DesktopAppStatus[\"Closed\"] = 0] = \"Closed\";\r\n    DesktopAppStatus[DesktopAppStatus[\"Loading\"] = 1] = \"Loading\";\r\n    DesktopAppStatus[DesktopAppStatus[\"Initializing\"] = 2] = \"Initializing\";\r\n    DesktopAppStatus[DesktopAppStatus[\"Ready\"] = 3] = \"Ready\";\r\n    DesktopAppStatus[DesktopAppStatus[\"FailedLoad\"] = 4] = \"FailedLoad\";\r\n})(DesktopAppStatus = exports.DesktopAppStatus || (exports.DesktopAppStatus = {}));\r\nclass DesktopState {\r\n}\r\nexports.DesktopState = DesktopState;\r\nclass MainWindow extends events_1.EventEmitter {\r\n    createWindow() {\r\n        const mainWindow = new electron_1.BrowserWindow({\r\n            height: 1000,\r\n            icon: constants_1.Constants.urls.icon,\r\n            width: 1600,\r\n            show: true,\r\n            webPreferences: {\r\n                webSecurity: false,\r\n                experimentalFeatures: true,\r\n                experimentalCanvasFeatures: true\r\n            },\r\n        });\r\n        const url = process.env.HOT ? devServerUrl : buildFileUrl;\r\n        mainWindow.loadURL(url);\r\n        return mainWindow;\r\n    }\r\n}\r\nexports.MainWindow = MainWindow;\r\n\n\n//# sourceURL=webpack:///./src/desktop/core/main-window.ts?");

/***/ }),

/***/ "./src/desktop/core/smart-card-certificate.ts":
/*!****************************************************!*\
  !*** ./src/desktop/core/smart-card-certificate.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst electron_1 = __webpack_require__(/*! electron */ \"electron\");\r\nfunction listenToSelectCertifcateEvent() {\r\n    electron_1.app.on(\"select-client-certificate\", (event, webcontents, url, certificates, callback) => {\r\n        if (certificates.length <= 1) {\r\n            return false;\r\n        }\r\n        event.preventDefault();\r\n        const picked = electron_1.dialog.showMessageBox({\r\n            message: \"Pick certificate\",\r\n            buttons: certificates.map(x => x.issuerName),\r\n        });\r\n        callback(certificates[picked]);\r\n        let index = -1;\r\n        if (index >= 0) {\r\n            callback(certificates[index]);\r\n        }\r\n    });\r\n}\r\nexports.listenToSelectCertifcateEvent = listenToSelectCertifcateEvent;\r\n\n\n//# sourceURL=webpack:///./src/desktop/core/smart-card-certificate.ts?");

/***/ }),

/***/ "./src/desktop/core/subprocess.ts":
/*!****************************************!*\
  !*** ./src/desktop/core/subprocess.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst child_process_1 = __webpack_require__(/*! child_process */ \"child_process\");\r\nfunction execCommand(command) {\r\n    return new Promise((resolve, reject) => {\r\n        child_process_1.exec(command, (error, stdout, stderr) => {\r\n            if (error) {\r\n                reject(error);\r\n            }\r\n            else {\r\n                resolve({ stdout, stderr });\r\n            }\r\n        });\r\n    });\r\n}\r\nexports.execCommand = execCommand;\r\n\n\n//# sourceURL=webpack:///./src/desktop/core/subprocess.ts?");

/***/ }),

/***/ "./src/desktop/logger/index.ts":
/*!*************************************!*\
  !*** ./src/desktop/logger/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nfunction __export(m) {\r\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\r\n}\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__export(__webpack_require__(/*! ./logger-proxy */ \"./src/desktop/logger/logger-proxy.ts\"));\r\n\n\n//# sourceURL=webpack:///./src/desktop/logger/index.ts?");

/***/ }),

/***/ "./src/desktop/logger/logger-proxy.ts":
/*!********************************************!*\
  !*** ./src/desktop/logger/logger-proxy.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst bunyan = __webpack_require__(/*! bunyan */ \"bunyan\");\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/desktop/constants.ts\");\r\nconst pretty_stream_1 = __webpack_require__(/*! ./pretty-stream */ \"./src/desktop/logger/pretty-stream.ts\");\r\nconst logsFolder = constants_1.Constants.logsFolder;\r\nconst stream = new pretty_stream_1.PrettyStream();\r\nstream.pipe(process.stderr);\r\nexports.logger = bunyan.createLogger({\r\n    name: \"Coglite Desktop\",\r\n    level: \"debug\",\r\n    streams: [\r\n        {\r\n            stream: stream,\r\n        },\r\n        {\r\n            type: \"rotating-file\",\r\n            path: path.join(logsFolder, \"desktop.log\"),\r\n            period: \"1d\",\r\n            count: 3,\r\n        },\r\n    ],\r\n});\r\nexports.pythonLogger = bunyan.createLogger({\r\n    name: \"Coglite Python\",\r\n    level: \"debug\",\r\n    streams: [\r\n        {\r\n            stream: stream,\r\n        },\r\n        {\r\n            type: \"rotating-file\",\r\n            path: path.join(logsFolder, \"python-server.log\"),\r\n            period: \"1d\",\r\n            count: 3,\r\n        },\r\n    ],\r\n});\r\nexports.renderLogger = bunyan.createLogger({\r\n    name: \"Coglite App\",\r\n    level: \"debug\",\r\n    streams: [\r\n        {\r\n            stream: stream,\r\n        },\r\n        {\r\n            type: \"rotating-file\",\r\n            path: path.join(logsFolder, \"app.log\"),\r\n            period: \"1d\",\r\n            count: 3,\r\n        },\r\n    ],\r\n});\r\n\n\n//# sourceURL=webpack:///./src/desktop/logger/logger-proxy.ts?");

/***/ }),

/***/ "./src/desktop/logger/pretty-stream.ts":
/*!*********************************************!*\
  !*** ./src/desktop/logger/pretty-stream.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst stream_1 = __webpack_require__(/*! stream */ \"stream\");\r\nconst util_1 = __webpack_require__(/*! util */ \"util\");\r\nconst colors = {\r\n    bold: [1, 22],\r\n    italic: [3, 23],\r\n    underline: [4, 24],\r\n    inverse: [7, 27],\r\n    white: [37, 39],\r\n    grey: [90, 39],\r\n    black: [30, 39],\r\n    blue: [34, 39],\r\n    cyan: [36, 39],\r\n    green: [32, 39],\r\n    magenta: [35, 39],\r\n    red: [31, 39],\r\n    yellow: [33, 39],\r\n};\r\nconst defaultOptions = {\r\n    useColor: true,\r\n};\r\nconst config = defaultOptions;\r\nconst levelFromName = {\r\n    trace: 10,\r\n    debug: 20,\r\n    info: 30,\r\n    warn: 40,\r\n    error: 50,\r\n    fatal: 60,\r\n};\r\nconst colorFromLevel = {\r\n    10: \"grey\",\r\n    20: \"grey\",\r\n    30: \"cyan\",\r\n    40: \"magenta\",\r\n    50: \"red\",\r\n    60: \"inverse\",\r\n};\r\nlet nameFromLevel = {};\r\nlet upperNameFromLevel = {};\r\nlet upperPaddedNameFromLevel = {};\r\nObject.keys(levelFromName).forEach((name) => {\r\n    let lvl = levelFromName[name];\r\n    nameFromLevel[lvl] = name;\r\n    upperNameFromLevel[lvl] = name.toUpperCase();\r\n    upperPaddedNameFromLevel[lvl] = (name.length === 4 ? \" \" : \"\") + name.toUpperCase();\r\n});\r\nfunction stylize(str, color = \"white\") {\r\n    if (!str) {\r\n        return \"\";\r\n    }\r\n    if (!config.useColor) {\r\n        return str;\r\n    }\r\n    let codes = colors[color];\r\n    if (codes) {\r\n        return \"\\x1B[\" + codes[0] + \"m\" + str +\r\n            \"\\x1B[\" + codes[1] + \"m\";\r\n    }\r\n    return str;\r\n}\r\nfunction indent(s) {\r\n    return \"    \" + s.split(/\\r?\\n/).join(\"\\n    \");\r\n}\r\nfunction extractTime(rec) {\r\n    let time = (typeof rec.time === \"object\") ? rec.time.toISOString() : rec.time;\r\n    return stylize(time.substr(11));\r\n}\r\nfunction extractLevel(rec) {\r\n    const level = (upperPaddedNameFromLevel[rec.level] || \"LVL\" + rec.level);\r\n    return stylize(level, colorFromLevel[rec.level]);\r\n}\r\nfunction isSingleLineMsg(rec) {\r\n    return rec.msg.indexOf(\"\\n\") === -1;\r\n}\r\nfunction extractMsg(rec) {\r\n    return stylize(rec.msg, \"cyan\");\r\n}\r\nfunction extractError(rec) {\r\n    if (rec.err && rec.err.stack) {\r\n        return rec.err.stack;\r\n    }\r\n}\r\nfunction extractCustomDetails(rec) {\r\n    const skip = new Set([\"name\", \"hostname\", \"pid\", \"level\", \"component\", \"msg\",\r\n        \"time\", \"v\", \"src\", \"err\", \"client_req\", \"client_res\", \"req\", \"res\"]);\r\n    const details = [];\r\n    const extras = {};\r\n    for (let key of Object.keys(rec)) {\r\n        if (skip.has(key)) {\r\n            continue;\r\n        }\r\n        let value = rec[key];\r\n        if (typeof value === \"undefined\") {\r\n            value = \"\";\r\n        }\r\n        let stringified = false;\r\n        if (typeof value !== \"string\") {\r\n            value = JSON.stringify(value, null, 2);\r\n            stringified = true;\r\n        }\r\n        if (value.indexOf(\"\\n\") !== -1 || value.length > 50) {\r\n            details.push(key + \": \" + value);\r\n        }\r\n        else if (!stringified && (value.indexOf(\" \") !== -1 || value.length === 0)) {\r\n            extras[key] = JSON.stringify(value);\r\n        }\r\n        else {\r\n            extras[key] = value;\r\n        }\r\n    }\r\n    return {\r\n        details: details,\r\n        extras: extras,\r\n    };\r\n}\r\nfunction applyDetails(results, details, extras) {\r\n    if (!results) {\r\n        return;\r\n    }\r\n    for (let detail of results.details) {\r\n        details.push(indent(detail));\r\n    }\r\n    for (let key of Object.keys(results.extras)) {\r\n        extras.push(key + \"=\" + results.extras[key]);\r\n    }\r\n}\r\nclass PrettyStream extends stream_1.Stream {\r\n    constructor(opts = {}) {\r\n        super();\r\n        let options = {};\r\n        if (opts) {\r\n            Object.keys(opts).forEach((key) => {\r\n                options[key] = {\r\n                    value: opts[key],\r\n                    enumerable: true,\r\n                    writable: true,\r\n                    configurable: true,\r\n                };\r\n            });\r\n        }\r\n        this.readable = true;\r\n        this.writable = true;\r\n    }\r\n    write(data) {\r\n        if (typeof data === \"string\") {\r\n            this.emit(\"data\", this.formatRecord(JSON.parse(data)));\r\n        }\r\n        else if (typeof data === \"object\") {\r\n            this.emit(\"data\", this.formatRecord(data));\r\n        }\r\n        return true;\r\n    }\r\n    end() {\r\n        this.emit(\"end\");\r\n        return true;\r\n    }\r\n    formatRecord(rec) {\r\n        let details = [];\r\n        let extras = [];\r\n        const time = extractTime(rec);\r\n        const level = extractLevel(rec);\r\n        const component = rec.name;\r\n        let msg = isSingleLineMsg(rec) ? extractMsg(rec) : \"\";\r\n        if (!msg) {\r\n            details.push(indent(extractMsg(rec)));\r\n        }\r\n        let error = extractError(rec);\r\n        if (error) {\r\n            details.push(indent(error));\r\n        }\r\n        applyDetails(extractCustomDetails(rec), details, extras);\r\n        extras = stylize((extras.length ? \" (\" + extras.join(\", \") + \")\" : \"\"), \"grey\");\r\n        details = stylize((details.length ? details.join(\"\\n    --\\n\") + \"\\n\" : \"\"), \"grey\");\r\n        return util_1.format(\"[%s] %s: %s: %s%s\\n%s\", time, level, component, msg, extras, details);\r\n    }\r\n}\r\nexports.PrettyStream = PrettyStream;\r\n\n\n//# sourceURL=webpack:///./src/desktop/logger/pretty-stream.ts?");

/***/ }),

/***/ "./src/desktop/main.ts":
/*!*****************************!*\
  !*** ./src/desktop/main.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst electron_1 = __webpack_require__(/*! electron */ \"electron\");\r\nelectron_1.app.setPath(\"userData\", path.join(electron_1.app.getPath(\"appData\"), \"coglite\"));\r\nconst logger_1 = __webpack_require__(/*! ./logger */ \"./src/desktop/logger/index.ts\");\r\n__webpack_require__(/*! reflect-metadata */ \"reflect-metadata\");\r\n__webpack_require__(/*! ../common/extensions */ \"./src/common/extensions/index.ts\");\r\nconst constants_1 = __webpack_require__(/*! ./constants */ \"./src/desktop/constants.ts\");\r\nvar mainhtml = constants_1.Constants.urls.main;\r\nconsole.log(mainhtml);\r\nconst startup_1 = __webpack_require__(/*! ./startup */ \"./src/desktop/startup.ts\");\r\nstartup_1.startCogliteDesktop().catch((e) => {\r\n    logger_1.logger.error(\"Error starting batchlabs\", e);\r\n});\r\n\n\n//# sourceURL=webpack:///./src/desktop/main.ts?");

/***/ }),

/***/ "./src/desktop/python-process/index.ts":
/*!*********************************************!*\
  !*** ./src/desktop/python-process/index.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nfunction __export(m) {\r\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\r\n}\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__export(__webpack_require__(/*! ./python-rpc-server-process */ \"./src/desktop/python-process/python-rpc-server-process.ts\"));\r\n__export(__webpack_require__(/*! ./python-executable */ \"./src/desktop/python-process/python-executable.ts\"));\r\n\n\n//# sourceURL=webpack:///./src/desktop/python-process/index.ts?");

/***/ }),

/***/ "./src/desktop/python-process/python-executable.ts":
/*!*********************************************************!*\
  !*** ./src/desktop/python-process/python-executable.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst core_1 = __webpack_require__(/*! ../core */ \"./src/desktop/core/index.ts\");\r\nconst logger_1 = __webpack_require__(/*! ../logger */ \"./src/desktop/logger/index.ts\");\r\nvar shell = __webpack_require__(/*! shelljs */ \"shelljs\");\r\nvar pythonCheck = shell.which('python');\r\nvar jupyterCheck = shell.which('jupyter');\r\nvar pythonExecPath = pythonCheck.stdout;\r\nvar jupyterExecPath = jupyterCheck.stdout;\r\nlet computedPythonPath = pythonExecPath;\r\nclass PythonExecutableError extends Error {\r\n    constructor(message) {\r\n        super();\r\n        this.message = message;\r\n    }\r\n}\r\nexports.PythonExecutableError = PythonExecutableError;\r\nclass PythonExecutableNotFoundError extends PythonExecutableError {\r\n    constructor(executable) {\r\n        super(`Python exec \"${executable}\" is not found.`);\r\n        this.executable = executable;\r\n    }\r\n}\r\nexports.PythonExecutableNotFoundError = PythonExecutableNotFoundError;\r\nfunction tryPython(pythonPath) {\r\n    return core_1.execCommand(`${pythonPath} --version`).then(({ stdout }) => {\r\n        const pythonVersion = parsePythonVersion(stdout);\r\n        if (!pythonVersion) {\r\n            throw new PythonExecutableError(`Could not parse python version from string ${stdout}`);\r\n        }\r\n        if (!isValidVersion(pythonVersion)) {\r\n            throw new PythonExecutableError(`Python version is not valid please install python >= 3.6`);\r\n        }\r\n        return pythonPath;\r\n    }).catch((error) => {\r\n        return Promise.reject(new PythonExecutableNotFoundError(pythonPath));\r\n    });\r\n}\r\nexports.tryPython = tryPython;\r\nfunction tryMultiplePythons(paths) {\r\n    const errors = {};\r\n    if (paths.length === 0) {\r\n        return Promise.reject({});\r\n    }\r\n    const firstPath = paths[0];\r\n    return tryPython(firstPath).then(() => {\r\n        return firstPath;\r\n    }).catch((error) => {\r\n        return tryMultiplePythons(paths.slice(1)).catch((errors) => {\r\n            return Promise.reject(Object.assign({}, errors, { [firstPath]: error }));\r\n        });\r\n    });\r\n}\r\nexports.tryMultiplePythons = tryMultiplePythons;\r\nfunction getPythonPath() {\r\n    if (computedPythonPath) {\r\n        return Promise.resolve(computedPythonPath);\r\n    }\r\n    const envPython = process.env.BL_PYTHON_PATH;\r\n    return tryMultiplePythons([envPython, \"python3\", \"python\"].filter(x => Boolean(x))).then((path) => {\r\n        computedPythonPath = path;\r\n        return path;\r\n    }).catch((errors) => {\r\n        let msg = \"Fail to find a valid python 3.6 installation:\";\r\n        for (let path of Object.keys(errors)) {\r\n            msg += `\\n  - ${path}: ${errors[path].message}`;\r\n        }\r\n        logger_1.logger.error(msg);\r\n        return null;\r\n    });\r\n}\r\nexports.getPythonPath = getPythonPath;\r\nconst pythonVersionRegex = /Python\\s*(\\d+)\\.(\\d+)\\.(\\d+)/;\r\nfunction parsePythonVersion(str) {\r\n    const out = pythonVersionRegex.exec(str);\r\n    if (!out || out.length < 4) {\r\n        return null;\r\n    }\r\n    else {\r\n        return {\r\n            major: parseInt(out[1], 10),\r\n            minor: parseInt(out[2], 10),\r\n            patch: parseInt(out[3], 10),\r\n        };\r\n    }\r\n}\r\nfunction isValidVersion(version) {\r\n    return version.major === 3 && version.minor >= 5;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/desktop/python-process/python-executable.ts?");

/***/ }),

/***/ "./src/desktop/python-process/python-rpc-server-process.ts":
/*!*****************************************************************!*\
  !*** ./src/desktop/python-process/python-rpc-server-process.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst child_process_1 = __webpack_require__(/*! child_process */ \"child_process\");\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/desktop/constants.ts\");\r\nconst logger_1 = __webpack_require__(/*! ../logger */ \"./src/desktop/logger/index.ts\");\r\nconst python_executable_1 = __webpack_require__(/*! ./python-executable */ \"./src/desktop/python-process/python-executable.ts\");\r\nconst asarPath = path.join(constants_1.Constants.root, \"../python-rpc/main\");\r\nconst localPath = path.join(constants_1.Constants.root, \"python/main.py\");\r\nconst logsFolder = constants_1.Constants.logsFolder;\r\nclass PythonRpcServerProcess {\r\n    start() {\r\n        this._askForKill = false;\r\n        return this._getCommandLine().then((data) => {\r\n            logger_1.logger.info(\"Python path is\", data.cmd, { args: data.args });\r\n            const child = this._spawedProcess = child_process_1.spawn(data.cmd, [...data.args]);\r\n            logger_1.pythonLogger.info(\"========================= STARTING PYTHON RPC SERVER PROCESS =========================\");\r\n            child.stdout.on(\"data\", (data) => {\r\n                logger_1.pythonLogger.info(data.toString());\r\n            });\r\n            child.stderr.on(\"data\", (data) => {\r\n                logger_1.pythonLogger.error(data.toString());\r\n            });\r\n            child.on(\"exit\", (code) => {\r\n                if (this._askForKill) {\r\n                    logger_1.logger.info(\"Python rpc server has stopped!\");\r\n                }\r\n                else {\r\n                    logger_1.logger.error(\"Python Rpc server has exited unexpectedly with code!\", code);\r\n                }\r\n            });\r\n            logger_1.logger.info(\"Python Rpc server started!\");\r\n        });\r\n    }\r\n    stop() {\r\n        if (this._spawedProcess) {\r\n            this._askForKill = true;\r\n            logger_1.logger.info(\"Stopping python rpc server!\");\r\n            this._spawedProcess.kill();\r\n        }\r\n    }\r\n    restart() {\r\n        this.stop();\r\n        this.start();\r\n    }\r\n    _getCommandLine() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const portPromise = process.env.HOT ? constants_1.Constants.pythonServerPort.dev : constants_1.Constants.pythonServerPort.prod;\r\n            return portPromise.then((port) => {\r\n                const portString = port.toString();\r\n                if (constants_1.Constants.isAsar) {\r\n                    return { cmd: asarPath, args: [portString] };\r\n                }\r\n                else {\r\n                    return python_executable_1.getPythonPath().then(pythonPath => {\r\n                        return {\r\n                            cmd: pythonPath,\r\n                            args: [localPath, portString],\r\n                        };\r\n                    });\r\n                }\r\n            });\r\n        });\r\n    }\r\n}\r\nexports.PythonRpcServerProcess = PythonRpcServerProcess;\r\n\n\n//# sourceURL=webpack:///./src/desktop/python-process/python-rpc-server-process.ts?");

/***/ }),

/***/ "./src/desktop/startup.ts":
/*!********************************!*\
  !*** ./src/desktop/startup.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst electron_1 = __webpack_require__(/*! electron */ \"electron\");\r\nconst core_1 = __webpack_require__(/*! ./core */ \"./src/desktop/core/index.ts\");\r\nconst python_process_1 = __webpack_require__(/*! ./python-process */ \"./src/desktop/python-process/index.ts\");\r\nconst core_2 = __webpack_require__(/*! ./core */ \"./src/desktop/core/index.ts\");\r\nconst pythonServer = new python_process_1.PythonRpcServerProcess();\r\npythonServer.start();\r\nvar cogliteApp;\r\nfunction registerAuthProtocol() {\r\n    electron_1.protocol.registerStringProtocol(\"urn\", (request, callback) => {\r\n        callback();\r\n    });\r\n}\r\nfunction startApplication(cogliteApp) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        registerAuthProtocol();\r\n        cogliteApp.registerCoreServices().then(() => {\r\n            cogliteApp.start();\r\n        });\r\n    });\r\n}\r\nfunction startCogliteDesktop() {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const cogliteApp = new core_2.CogliteDesktopApp();\r\n        if (electron_1.app.isReady()) {\r\n            startApplication(cogliteApp);\r\n        }\r\n        else {\r\n            electron_1.app.on(\"ready\", () => __awaiter(this, void 0, void 0, function* () {\r\n                startApplication(cogliteApp);\r\n            }));\r\n        }\r\n        core_1.listenToSelectCertifcateEvent();\r\n        process.on(\"exit\", () => {\r\n            cogliteApp.quit();\r\n            pythonServer.stop();\r\n        });\r\n        process.on(\"SIGINT\", () => {\r\n            process.exit(-1);\r\n        });\r\n        process.on(\"SIGINT\", () => {\r\n            process.exit(-2);\r\n        });\r\n    });\r\n}\r\nexports.startCogliteDesktop = startCogliteDesktop;\r\n\n\n//# sourceURL=webpack:///./src/desktop/startup.ts?");

/***/ }),

/***/ "bunyan":
/*!*************************!*\
  !*** external "bunyan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bunyan\");\n\n//# sourceURL=webpack:///external_%22bunyan%22?");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"child_process\");\n\n//# sourceURL=webpack:///external_%22child_process%22?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron\");\n\n//# sourceURL=webpack:///external_%22electron%22?");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"events\");\n\n//# sourceURL=webpack:///external_%22events%22?");

/***/ }),

/***/ "fs-jetpack":
/*!*****************************!*\
  !*** external "fs-jetpack" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs-jetpack\");\n\n//# sourceURL=webpack:///external_%22fs-jetpack%22?");

/***/ }),

/***/ "mkdirp":
/*!*************************!*\
  !*** external "mkdirp" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mkdirp\");\n\n//# sourceURL=webpack:///external_%22mkdirp%22?");

/***/ }),

/***/ "moment-duration-format":
/*!*****************************************!*\
  !*** external "moment-duration-format" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment-duration-format\");\n\n//# sourceURL=webpack:///external_%22moment-duration-format%22?");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"net\");\n\n//# sourceURL=webpack:///external_%22net%22?");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"os\");\n\n//# sourceURL=webpack:///external_%22os%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"reflect-metadata\");\n\n//# sourceURL=webpack:///external_%22reflect-metadata%22?");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"rxjs\");\n\n//# sourceURL=webpack:///external_%22rxjs%22?");

/***/ }),

/***/ "shelljs":
/*!**************************!*\
  !*** external "shelljs" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"shelljs\");\n\n//# sourceURL=webpack:///external_%22shelljs%22?");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"stream\");\n\n//# sourceURL=webpack:///external_%22stream%22?");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"util\");\n\n//# sourceURL=webpack:///external_%22util%22?");

/***/ })

/******/ });