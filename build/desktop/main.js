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

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\r\n\tif (!module.webpackPolyfill) {\r\n\t\tmodule.deprecate = function() {};\r\n\t\tmodule.paths = [];\r\n\t\t// module.parent = undefined by default\r\n\t\tif (!module.children) module.children = [];\r\n\t\tObject.defineProperty(module, \"loaded\", {\r\n\t\t\tenumerable: true,\r\n\t\t\tget: function() {\r\n\t\t\t\treturn module.l;\r\n\t\t\t}\r\n\t\t});\r\n\t\tObject.defineProperty(module, \"id\", {\r\n\t\t\tenumerable: true,\r\n\t\t\tget: function() {\r\n\t\t\t\treturn module.i;\r\n\t\t\t}\r\n\t\t});\r\n\t\tmodule.webpackPolyfill = 1;\r\n\t}\r\n\treturn module;\r\n};\r\n\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ "./src/common/extensions/array.ts":
/*!****************************************!*\
  !*** ./src/common/extensions/array.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// tslint:disable:only-arrow-functions\n// First, checks if it isn't implemented yet.\nif (!Array.prototype.first) {\n  Array.prototype.first = function () {\n    return this[0];\n  };\n}\n\nif (!Array.prototype.last) {\n  Array.prototype.last = function () {\n    return this[this.length - 1];\n  };\n}\n\nif (!Array.prototype.flatten) {\n  Array.prototype.flatten = function () {\n    return [].concat(...this);\n  };\n}\n\nif (!Array.prototype.sortBy) {\n  Array.prototype.sortBy = function (attr) {\n    return this.sort((a, b) => {\n      const aAttr = attr(a);\n      const bAttr = attr(b);\n\n      if (aAttr < bAttr) {\n        return -1;\n      } else if (aAttr > bAttr) {\n        return 1;\n      } else {\n        return 0;\n      }\n    });\n  };\n}\n\n//# sourceURL=webpack:///./src/common/extensions/array.ts?");

/***/ }),

/***/ "./src/common/extensions/index.ts":
/*!****************************************!*\
  !*** ./src/common/extensions/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! moment-duration-format */ \"moment-duration-format\");\n\n__webpack_require__(/*! ./array */ \"./src/common/extensions/array.ts\");\n\n__webpack_require__(/*! ./observable */ \"./src/common/extensions/observable.ts\");\n\n__webpack_require__(/*! ./string */ \"./src/common/extensions/string.ts\");\n\n//# sourceURL=webpack:///./src/common/extensions/index.ts?");

/***/ }),

/***/ "./src/common/extensions/observable.ts":
/*!*********************************************!*\
  !*** ./src/common/extensions/observable.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nif (!_rxjs.Observable.prototype.cascade) {\n  _rxjs.Observable.prototype.cascade = function (callback) {\n    const subject = new _rxjs.AsyncSubject();\n    this.take(1).subscribe({\n      next: data => {\n        const obs = callback(data);\n\n        if (!(obs instanceof _rxjs.Observable)) {\n          subject.next(obs);\n          subject.complete();\n          return;\n        }\n\n        obs.take(1).subscribe({\n          next: out => {\n            subject.next(out);\n            subject.complete();\n          },\n          error: e => subject.error(e)\n        });\n      },\n      error: e => subject.error(e)\n    });\n    return subject.asObservable();\n  };\n}\n\n//# sourceURL=webpack:///./src/common/extensions/observable.ts?");

/***/ }),

/***/ "./src/common/extensions/string.ts":
/*!*****************************************!*\
  !*** ./src/common/extensions/string.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// tslint:disable:only-arrow-functions\n// First, checks if it isn't implemented yet.\nif (!String.prototype.format) {\n  String.prototype.format = function (...args) {\n    return this.replace(/{(\\d+)}/g, (match, i) => {\n      return typeof args[i] !== \"undefined\" ? args[i] : match;\n    });\n  };\n}\n\nif (!String.prototype.clearWhitespace) {\n  String.prototype.clearWhitespace = function () {\n    return this.replace(/\\s/g, \"\");\n  };\n}\n\nif (!String.prototype.padStart) {\n  String.prototype.padStart = function (maxLength, padString) {\n    padString = padString ? String(padString) : \" \";\n\n    if (padString.length === 0) {\n      padString = \" \";\n    }\n\n    const str = String(this);\n    const fillLen = maxLength - str.length;\n\n    if (fillLen > 0) {\n      const timesToRepeat = Math.ceil(fillLen / padString.length);\n      const truncatedStringFiller = padString.repeat(timesToRepeat).slice(0, fillLen);\n      return truncatedStringFiller + str;\n    }\n\n    return str;\n  };\n}\n\nif (!String.prototype.trimEnd) {\n  String.prototype.trimEnd = function (...values) {\n    let input = String(this) || \"\";\n\n    while (input) {\n      const match = values.find(value => {\n        return value && input.endsWith(value);\n      });\n\n      if (!match) {\n        break;\n      }\n\n      input = input.substr(0, input.length - match.length);\n    }\n\n    return input;\n  };\n}\n\nif (!String.prototype.contains) {\n  String.prototype.contains = function (substr) {\n    return this.indexOf(substr) !== -1;\n  };\n}\n\nif (!String.prototype.isBlank) {\n  String.prototype.isBlank = function () {\n    return !this || /^\\s*$/.test(this);\n  };\n}\n\n//# sourceURL=webpack:///./src/common/extensions/string.ts?");

/***/ }),

/***/ "./src/desktop/constants.ts":
/*!**********************************!*\
  !*** ./src/desktop/constants.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Constants = void 0;\n\nvar _electron = __webpack_require__(/*! electron */ \"electron\");\n\nvar mkdirp = __webpack_require__(/*! mkdirp */ \"mkdirp\");\n\nvar net = __webpack_require__(/*! net */ \"net\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar _os = __webpack_require__(/*! os */ \"os\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar jetpack = __webpack_require__(/*! fs-jetpack */ \"fs-jetpack\");\n\nconst APP_ROOT_DIR = jetpack.cwd(_electron.app.getAppPath()); //const manifest = appDir.read(\"package.json\", \"json\");\n\nconst packageConfig = APP_ROOT_DIR.read(\"package.json\", \"json\");\nconst apiUrl = 'http://localhost:3500';\nconst localDBname = 'coglite';\nconst cogliteDir = (0, path.normalize)(`${(0, _os.homedir)()}/.coglite/`);\nconst uploadDir = (0, path.normalize)(`${(0, _os.homedir)()}/.coglite/uploads/`); // Root is relative to where this file is when in the build folder)\n//const root = path.join(__dirname, \"../..\");\n\nconst root = path.join(_electron.app.getAppPath());\nconst portrange = 45032;\n\nfunction getPort(port = portrange) {\n  return new Promise((resolve, reject) => {\n    const server = net.createServer();\n    server.listen(port, err => {\n      server.once(\"close\", () => {\n        resolve(port);\n      });\n      server.close();\n    });\n    server.on(\"error\", err => {\n      getPort(port + 1).then(x => {\n        resolve(x);\n      });\n    });\n  });\n} //const packageConfig = require(`${root}/package.json`);\n\n\nconst urls = {\n  main: {\n    dev: \"http://localhost:3178/index.html\",\n    prod: `file://${__dirname}/../../build/index.html`\n  },\n  splash: {\n    dev: `file://${root}/src/server/splash-screen/splash-screen.html`,\n    prod: `file://${root}/build/server/splash-screen/splash-screen.html`\n  },\n  recover: {\n    dev: `file://${root}/src/server/recover-window/recover-window.html`,\n    prod: `file://${root}/build/server/recover-window/recover-window.html`\n  },\n  icon: __dirname + \"/../assets/images/icon.ico\"\n};\nconst isAsar = process.mainModule.filename.indexOf(\"app.asar\") !== -1;\nconst logsFolder = isAsar ? path.join(_electron.app.getPath(\"userData\"), \"logs\") : path.join(root, \"logs\");\nconst resourcesFolder = isAsar ? path.normalize(path.join(root, \"..\")) : root;\nmkdirp.sync(logsFolder);\nconst pythonServerPort = {\n  dev: Promise.resolve(8765),\n  prod: getPort()\n};\nconst customProtocolName = 'coglite';\nconst Constants = {\n  isAsar,\n  isDev: !isAsar,\n  root,\n  urls,\n  logsFolder,\n  resourcesFolder,\n  pythonServerPort,\n  version: packageConfig.version,\n  customProtocolName\n};\nexports.Constants = Constants;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(APP_ROOT_DIR, \"APP_ROOT_DIR\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\constants.ts\");\n  reactHotLoader.register(packageConfig, \"packageConfig\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\constants.ts\");\n  reactHotLoader.register(apiUrl, \"apiUrl\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\constants.ts\");\n  reactHotLoader.register(localDBname, \"localDBname\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\constants.ts\");\n  reactHotLoader.register(cogliteDir, \"cogliteDir\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\constants.ts\");\n  reactHotLoader.register(uploadDir, \"uploadDir\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\constants.ts\");\n  reactHotLoader.register(root, \"root\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\constants.ts\");\n  reactHotLoader.register(portrange, \"portrange\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\constants.ts\");\n  reactHotLoader.register(getPort, \"getPort\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\constants.ts\");\n  reactHotLoader.register(urls, \"urls\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\constants.ts\");\n  reactHotLoader.register(isAsar, \"isAsar\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\constants.ts\");\n  reactHotLoader.register(logsFolder, \"logsFolder\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\constants.ts\");\n  reactHotLoader.register(resourcesFolder, \"resourcesFolder\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\constants.ts\");\n  reactHotLoader.register(pythonServerPort, \"pythonServerPort\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\constants.ts\");\n  reactHotLoader.register(customProtocolName, \"customProtocolName\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\constants.ts\");\n  reactHotLoader.register(Constants, \"Constants\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\constants.ts\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/desktop/constants.ts?");

/***/ }),

/***/ "./src/desktop/core/application.ts":
/*!*****************************************!*\
  !*** ./src/desktop/core/application.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.CogliteDesktopApp = void 0;\n\nvar os = __webpack_require__(/*! os */ \"os\");\n\nvar _events = __webpack_require__(/*! events */ \"events\");\n\nvar _electron = __webpack_require__(/*! electron */ \"electron\");\n\nvar _constants = __webpack_require__(/*! ../constants */ \"./src/desktop/constants.ts\");\n\nvar _logger = __webpack_require__(/*! ../logger */ \"./src/desktop/logger/index.ts\");\n\nvar _mainWindow = __webpack_require__(/*! ./main-window */ \"./src/desktop/core/main-window.ts\");\n\nvar _util = __webpack_require__(/*! util */ \"util\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nconst osName = `${os.platform()}-${os.arch()}/${os.release()}`;\nconst isDev = _constants.Constants.isDev ? \"-dev\" : \"\";\nconst userAgent = `(${osName}) Coglite/${_constants.Constants.version}${isDev}`;\n\nclass CogliteDesktopApp extends _events.EventEmitter {\n  constructor(...args) {\n    var _temp;\n\n    return _temp = super(...args), this.mainWindow = new _mainWindow.MainWindow(), _temp;\n  }\n\n  /** create entry window (main window for now) and python or whatever else  */\n  async start() {\n    this.mainWindow.createWindow();\n  }\n\n  async registerCoreServices() {\n    this._registerLifeCycleEventHandlers();\n\n    this._registerCustomProtocol();\n  }\n\n  _registerLifeCycleEventHandlers() {\n    _electron.app.on(\"window-all-closed\", () => {\n      if (process.platform !== \"darwin\") {\n        _electron.app.quit();\n      }\n    });\n\n    _electron.app.on(\"activate\", () => {\n      if ((0, _util.isNullOrUndefined)(this.mainWindow) === true) {\n        this.start();\n      }\n    });\n\n    _electron.ipcMain.once(\"exit\", () => {\n      process.exit(1);\n    });\n\n    process.on(\"uncaughtException\", error => {\n      _logger.logger.error(\"There was a uncaught exception\", error);\n    }); //not sure if this is gonna cause problems -- we ref'd the window variable already, but we havn't yet created the window\n\n    this.mainWindow.on(\"closed\", () => {\n      _logger.logger.info(`Window ${this.constructor.name} closed. Quiting the app.`);\n\n      _electron.app.quit();\n    });\n\n    _electron.ipcMain.once(\"exit\", () => {\n      process.exit(1);\n    });\n\n    process.on(\"uncaughtException\", error => {\n      _logger.logger.error(\"There was a uncaught exception\", error); //this.recoverWindow.createWithError(error.message);\n\n    });\n    process.on(\"unhandledRejection\", r => {\n      _logger.logger.error(\"Unhandled promise error:\", r);\n    });\n    /* -- maybe useful later but if we're using app.makeSingleInstance this makes no sense to use here\r\n    basically a noop \r\n    app.on(\"window-all-closed\", () => {\r\n        // Required or electron will close when closing last open window before next one open\r\n    });*/\n\n    /*\r\n            app.on(\"login\", async (event, webContents, request, authInfo, callback) => {\r\n                event.preventDefault();\r\n                try {\r\n                    const { username, password } = await this.proxySettings.credentials();\r\n                    callback(username, password);\r\n                } catch (e) {\r\n                    logger.error(\"Unable to retrieve credentials for proxy settings\", e);\r\n                    this.quit();\r\n                }\r\n            });\r\n        }\r\n    */\n  }\n\n  _registerCustomProtocol() {\n    if (_constants.Constants.isDev) {\n      return;\n    }\n\n    if (_electron.app.setAsDefaultProtocolClient(_constants.Constants.customProtocolName)) {\n      _logger.logger.info(`Registered ${_constants.Constants.customProtocolName}:// as a protocol for coglite desktop`);\n    } else {\n      _logger.logger.error(`Failed to register ${_constants.Constants.customProtocolName}:// as a protocol for coglite desktop`);\n    }\n  }\n\n  quit() {\n    _electron.app.quit();\n  }\n\n  __reactstandin__regenerateByEval(key, code) {\n    this[key] = eval(code);\n  }\n\n}\n\nexports.CogliteDesktopApp = CogliteDesktopApp;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(osName, \"osName\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\core\\\\application.ts\");\n  reactHotLoader.register(isDev, \"isDev\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\core\\\\application.ts\");\n  reactHotLoader.register(userAgent, \"userAgent\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\core\\\\application.ts\");\n  reactHotLoader.register(CogliteDesktopApp, \"CogliteDesktopApp\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\core\\\\application.ts\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/desktop/core/application.ts?");

/***/ }),

/***/ "./src/desktop/core/index.ts":
/*!***********************************!*\
  !*** ./src/desktop/core/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _subprocess = __webpack_require__(/*! ./subprocess */ \"./src/desktop/core/subprocess.ts\");\n\nObject.keys(_subprocess).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function () {\n      return _subprocess[key];\n    }\n  });\n});\n\nvar _application = __webpack_require__(/*! ./application */ \"./src/desktop/core/application.ts\");\n\nObject.keys(_application).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function () {\n      return _application[key];\n    }\n  });\n});\n\nvar _smartCardCertificate = __webpack_require__(/*! ./smart-card-certificate */ \"./src/desktop/core/smart-card-certificate.ts\");\n\nObject.keys(_smartCardCertificate).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function () {\n      return _smartCardCertificate[key];\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/desktop/core/index.ts?");

/***/ }),

/***/ "./src/desktop/core/main-window.ts":
/*!*****************************************!*\
  !*** ./src/desktop/core/main-window.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.MainWindow = exports.DesktopState = exports.DesktopAppStatus = void 0;\n\nvar _electron = __webpack_require__(/*! electron */ \"electron\");\n\nvar _constants = __webpack_require__(/*! ../constants */ \"./src/desktop/constants.ts\");\n\nvar _events = __webpack_require__(/*! events */ \"events\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nconst devServerUrl = _constants.Constants.urls.main.dev;\nconst buildFileUrl = _constants.Constants.urls.main.prod;\nlet DesktopAppStatus;\nexports.DesktopAppStatus = DesktopAppStatus;\n\n(function (DesktopAppStatus) {\n  DesktopAppStatus[DesktopAppStatus[\"Closed\"] = 0] = \"Closed\";\n  DesktopAppStatus[DesktopAppStatus[\"Loading\"] = 1] = \"Loading\";\n  DesktopAppStatus[DesktopAppStatus[\"Initializing\"] = 2] = \"Initializing\";\n  DesktopAppStatus[DesktopAppStatus[\"Ready\"] = 3] = \"Ready\";\n  DesktopAppStatus[DesktopAppStatus[\"FailedLoad\"] = 4] = \"FailedLoad\";\n})(DesktopAppStatus || (exports.DesktopAppStatus = DesktopAppStatus = {}));\n\nclass DesktopState {\n  constructor() {\n    this.status = void 0;\n  }\n\n  __reactstandin__regenerateByEval(key, code) {\n    this[key] = eval(code);\n  }\n\n}\n\nexports.DesktopState = DesktopState;\n\nclass MainWindow extends _events.EventEmitter {\n  createWindow() {\n    const mainWindow = new _electron.BrowserWindow({\n      height: 1000,\n      icon: _constants.Constants.urls.icon,\n      width: 1600,\n      show: true,\n      webPreferences: {\n        webSecurity: false,\n        experimentalFeatures: true,\n        experimentalCanvasFeatures: true\n      }\n    });\n    const url = process.env.HOT ? devServerUrl : buildFileUrl; //this.setupDesktopEventHandlers(mainWindow);\n\n    mainWindow.loadURL(url);\n    return mainWindow;\n  }\n\n  __reactstandin__regenerateByEval(key, code) {\n    this[key] = eval(code);\n  }\n\n}\n\nexports.MainWindow = MainWindow;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(devServerUrl, \"devServerUrl\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\core\\\\main-window.ts\");\n  reactHotLoader.register(buildFileUrl, \"buildFileUrl\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\core\\\\main-window.ts\");\n  reactHotLoader.register(DesktopState, \"DesktopState\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\core\\\\main-window.ts\");\n  reactHotLoader.register(MainWindow, \"MainWindow\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\core\\\\main-window.ts\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/desktop/core/main-window.ts?");

/***/ }),

/***/ "./src/desktop/core/smart-card-certificate.ts":
/*!****************************************************!*\
  !*** ./src/desktop/core/smart-card-certificate.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.listenToSelectCertifcateEvent = listenToSelectCertifcateEvent;\n\nvar _electron = __webpack_require__(/*! electron */ \"electron\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nfunction listenToSelectCertifcateEvent() {\n  _electron.app.on(\"select-client-certificate\", (event, webcontents, url, certificates, callback) => {\n    if (certificates.length <= 1) {\n      // Default behavior is appropriate\n      return false;\n    }\n\n    event.preventDefault();\n\n    const picked = _electron.dialog.showMessageBox({\n      message: \"Pick certificate\",\n      buttons: certificates.map(x => x.issuerName)\n    });\n\n    callback(certificates[picked]);\n    let index = -1;\n\n    if (index >= 0) {\n      callback(certificates[index]);\n    }\n  });\n}\n\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(listenToSelectCertifcateEvent, \"listenToSelectCertifcateEvent\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\core\\\\smart-card-certificate.ts\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/desktop/core/smart-card-certificate.ts?");

/***/ }),

/***/ "./src/desktop/core/subprocess.ts":
/*!****************************************!*\
  !*** ./src/desktop/core/subprocess.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.execCommand = execCommand;\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\n/**\r\n * Execute a command line and wait for the output.\r\n * @param command Command line to run\r\n *\r\n * @returns Promise that resolove when the command line complete.\r\n */\nfunction execCommand(command) {\n  return new Promise((resolve, reject) => {\n    (0, _child_process.exec)(command, (error, stdout, stderr) => {\n      if (error) {\n        reject(error);\n      } else {\n        resolve({\n          stdout,\n          stderr\n        });\n      }\n    });\n  });\n}\n\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(execCommand, \"execCommand\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\core\\\\subprocess.ts\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/desktop/core/subprocess.ts?");

/***/ }),

/***/ "./src/desktop/init.ts":
/*!*****************************!*\
  !*** ./src/desktop/init.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\n/**\r\n * Add the src/ folder to the NODE_PATH to be able to do absolute import(Relative to src folder)\r\n * Make sure you import this file before any client imports\r\n */\nprocess.env.NODE_PATH = path.join(__dirname, \"..\"); // tslint:disable-next-line:no-var-requires\n\n__webpack_require__(/*! module */ \"module\").Module._initPaths();\n\n//# sourceURL=webpack:///./src/desktop/init.ts?");

/***/ }),

/***/ "./src/desktop/logger/index.ts":
/*!*************************************!*\
  !*** ./src/desktop/logger/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _loggerProxy = __webpack_require__(/*! ./logger-proxy */ \"./src/desktop/logger/logger-proxy.ts\");\n\nObject.keys(_loggerProxy).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function () {\n      return _loggerProxy[key];\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/desktop/logger/index.ts?");

/***/ }),

/***/ "./src/desktop/logger/logger-proxy.ts":
/*!********************************************!*\
  !*** ./src/desktop/logger/logger-proxy.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.renderLogger = exports.pythonLogger = exports.logger = void 0;\n\nvar bunyan = __webpack_require__(/*! bunyan */ \"bunyan\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar _constants = __webpack_require__(/*! ../constants */ \"./src/desktop/constants.ts\");\n\nvar _prettyStream = __webpack_require__(/*! ./pretty-stream */ \"./src/desktop/logger/pretty-stream.ts\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nconst logsFolder = _constants.Constants.logsFolder;\nconst stream = new _prettyStream.PrettyStream();\nstream.pipe(process.stderr);\nconst logger = bunyan.createLogger({\n  name: \"Coglite Desktop\",\n  level: \"debug\",\n  streams: [{\n    stream: stream\n  }, {\n    type: \"rotating-file\",\n    path: path.join(logsFolder, \"desktop.log\"),\n    period: \"1d\",\n    // daily rotation\n    count: 3 // keep 3 back copies\n\n  }]\n});\nexports.logger = logger;\nconst pythonLogger = bunyan.createLogger({\n  name: \"Coglite Python\",\n  level: \"debug\",\n  streams: [{\n    stream: stream\n  }, {\n    type: \"rotating-file\",\n    path: path.join(logsFolder, \"python-server.log\"),\n    period: \"1d\",\n    // daily rotation\n    count: 3 // keep 3 back copies\n\n  }]\n});\nexports.pythonLogger = pythonLogger;\nconst renderLogger = bunyan.createLogger({\n  name: \"Coglite App\",\n  level: \"debug\",\n  streams: [{\n    stream: stream\n  }, {\n    type: \"rotating-file\",\n    path: path.join(logsFolder, \"app.log\"),\n    period: \"1d\",\n    // daily rotation\n    count: 3 // keep 3 back copies\n\n  }]\n});\nexports.renderLogger = renderLogger;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(logsFolder, \"logsFolder\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\logger-proxy.ts\");\n  reactHotLoader.register(stream, \"stream\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\logger-proxy.ts\");\n  reactHotLoader.register(logger, \"logger\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\logger-proxy.ts\");\n  reactHotLoader.register(pythonLogger, \"pythonLogger\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\logger-proxy.ts\");\n  reactHotLoader.register(renderLogger, \"renderLogger\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\logger-proxy.ts\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/desktop/logger/logger-proxy.ts?");

/***/ }),

/***/ "./src/desktop/logger/pretty-stream.ts":
/*!*********************************************!*\
  !*** ./src/desktop/logger/pretty-stream.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.PrettyStream = void 0;\n\nvar _stream = __webpack_require__(/*! stream */ \"stream\");\n\nvar _util = __webpack_require__(/*! util */ \"util\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nconst colors = {\n  bold: [1, 22],\n  italic: [3, 23],\n  underline: [4, 24],\n  inverse: [7, 27],\n  white: [37, 39],\n  grey: [90, 39],\n  black: [30, 39],\n  blue: [34, 39],\n  cyan: [36, 39],\n  green: [32, 39],\n  magenta: [35, 39],\n  red: [31, 39],\n  yellow: [33, 39]\n};\nconst defaultOptions = {\n  useColor: true\n};\nconst config = defaultOptions;\nconst levelFromName = {\n  trace: 10,\n  debug: 20,\n  info: 30,\n  warn: 40,\n  error: 50,\n  fatal: 60\n};\nconst colorFromLevel = {\n  10: \"grey\",\n  // TRACE\n  20: \"grey\",\n  // DEBUG\n  30: \"cyan\",\n  // INFO\n  40: \"magenta\",\n  // WARN\n  50: \"red\",\n  // ERROR\n  60: \"inverse\" // FATAL\n\n};\nlet nameFromLevel = {};\nlet upperNameFromLevel = {};\nlet upperPaddedNameFromLevel = {};\nObject.keys(levelFromName).forEach(name => {\n  let lvl = levelFromName[name];\n  nameFromLevel[lvl] = name;\n  upperNameFromLevel[lvl] = name.toUpperCase();\n  upperPaddedNameFromLevel[lvl] = (name.length === 4 ? \" \" : \"\") + name.toUpperCase();\n});\n\nfunction stylize(str, color = \"white\") {\n  if (!str) {\n    return \"\";\n  }\n\n  if (!config.useColor) {\n    return str;\n  }\n\n  let codes = colors[color];\n\n  if (codes) {\n    return \"\\x1B[\" + codes[0] + \"m\" + str + \"\\x1B[\" + codes[1] + \"m\";\n  }\n\n  return str;\n}\n\nfunction indent(s) {\n  return \"    \" + s.split(/\\r?\\n/).join(\"\\n    \");\n}\n\nfunction extractTime(rec) {\n  let time = typeof rec.time === \"object\" ? rec.time.toISOString() : rec.time;\n  return stylize(time.substr(11));\n}\n\nfunction extractLevel(rec) {\n  const level = upperPaddedNameFromLevel[rec.level] || \"LVL\" + rec.level;\n  return stylize(level, colorFromLevel[rec.level]);\n}\n\nfunction isSingleLineMsg(rec) {\n  return rec.msg.indexOf(\"\\n\") === -1;\n}\n\nfunction extractMsg(rec) {\n  return stylize(rec.msg, \"cyan\");\n}\n\nfunction extractError(rec) {\n  if (rec.err && rec.err.stack) {\n    return rec.err.stack;\n  }\n}\n\nfunction extractCustomDetails(rec) {\n  const skip = new Set([\"name\", \"hostname\", \"pid\", \"level\", \"component\", \"msg\", \"time\", \"v\", \"src\", \"err\", \"client_req\", \"client_res\", \"req\", \"res\"]);\n  const details = [];\n  const extras = {};\n\n  for (let key of Object.keys(rec)) {\n    if (skip.has(key)) {\n      continue;\n    }\n\n    let value = rec[key];\n\n    if (typeof value === \"undefined\") {\n      value = \"\";\n    }\n\n    let stringified = false;\n\n    if (typeof value !== \"string\") {\n      value = JSON.stringify(value, null, 2);\n      stringified = true;\n    }\n\n    if (value.indexOf(\"\\n\") !== -1 || value.length > 50) {\n      details.push(key + \": \" + value);\n    } else if (!stringified && (value.indexOf(\" \") !== -1 || value.length === 0)) {\n      extras[key] = JSON.stringify(value);\n    } else {\n      extras[key] = value;\n    }\n  }\n\n  return {\n    details: details,\n    extras: extras\n  };\n}\n\nfunction applyDetails(results, details, extras) {\n  if (!results) {\n    return;\n  }\n\n  for (let detail of results.details) {\n    details.push(indent(detail));\n  }\n\n  for (let key of Object.keys(results.extras)) {\n    extras.push(key + \"=\" + results.extras[key]);\n  }\n}\n\nclass PrettyStream extends _stream.Stream {\n  constructor(opts = {}) {\n    super();\n    let options = {};\n\n    if (opts) {\n      Object.keys(opts).forEach(key => {\n        options[key] = {\n          value: opts[key],\n          enumerable: true,\n          writable: true,\n          configurable: true\n        };\n      });\n    } // let config = Object.create(defaultOptions, options);\n\n\n    this.readable = true;\n    this.writable = true;\n  }\n\n  write(data) {\n    if (typeof data === \"string\") {\n      this.emit(\"data\", this.formatRecord(JSON.parse(data)));\n    } else if (typeof data === \"object\") {\n      this.emit(\"data\", this.formatRecord(data));\n    }\n\n    return true;\n  }\n\n  end() {\n    this.emit(\"end\");\n    return true;\n  }\n\n  formatRecord(rec) {\n    let details = [];\n    let extras = [];\n    const time = extractTime(rec);\n    const level = extractLevel(rec);\n    const component = rec.name;\n    let msg = isSingleLineMsg(rec) ? extractMsg(rec) : \"\";\n\n    if (!msg) {\n      details.push(indent(extractMsg(rec)));\n    }\n\n    let error = extractError(rec);\n\n    if (error) {\n      details.push(indent(error));\n    }\n\n    applyDetails(extractCustomDetails(rec), details, extras);\n    extras = stylize(extras.length ? \" (\" + extras.join(\", \") + \")\" : \"\", \"grey\");\n    details = stylize(details.length ? details.join(\"\\n    --\\n\") + \"\\n\" : \"\", \"grey\");\n    return (0, _util.format)(\"[%s] %s: %s: %s%s\\n%s\", time, level, component, msg, extras, details);\n  }\n\n  __reactstandin__regenerateByEval(key, code) {\n    this[key] = eval(code);\n  }\n\n}\n\nexports.PrettyStream = PrettyStream;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(colors, \"colors\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\pretty-stream.ts\");\n  reactHotLoader.register(defaultOptions, \"defaultOptions\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\pretty-stream.ts\");\n  reactHotLoader.register(config, \"config\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\pretty-stream.ts\");\n  reactHotLoader.register(levelFromName, \"levelFromName\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\pretty-stream.ts\");\n  reactHotLoader.register(colorFromLevel, \"colorFromLevel\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\pretty-stream.ts\");\n  reactHotLoader.register(nameFromLevel, \"nameFromLevel\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\pretty-stream.ts\");\n  reactHotLoader.register(upperNameFromLevel, \"upperNameFromLevel\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\pretty-stream.ts\");\n  reactHotLoader.register(upperPaddedNameFromLevel, \"upperPaddedNameFromLevel\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\pretty-stream.ts\");\n  reactHotLoader.register(stylize, \"stylize\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\pretty-stream.ts\");\n  reactHotLoader.register(indent, \"indent\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\pretty-stream.ts\");\n  reactHotLoader.register(extractTime, \"extractTime\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\pretty-stream.ts\");\n  reactHotLoader.register(extractLevel, \"extractLevel\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\pretty-stream.ts\");\n  reactHotLoader.register(isSingleLineMsg, \"isSingleLineMsg\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\pretty-stream.ts\");\n  reactHotLoader.register(extractMsg, \"extractMsg\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\pretty-stream.ts\");\n  reactHotLoader.register(extractError, \"extractError\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\pretty-stream.ts\");\n  reactHotLoader.register(extractCustomDetails, \"extractCustomDetails\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\pretty-stream.ts\");\n  reactHotLoader.register(applyDetails, \"applyDetails\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\pretty-stream.ts\");\n  reactHotLoader.register(PrettyStream, \"PrettyStream\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\logger\\\\pretty-stream.ts\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/desktop/logger/pretty-stream.ts?");

/***/ }),

/***/ "./src/desktop/main.ts":
/*!*****************************!*\
  !*** ./src/desktop/main.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\n__webpack_require__(/*! ./init */ \"./src/desktop/init.ts\");\n\nvar _electron = __webpack_require__(/*! electron */ \"electron\");\n\nvar _logger = __webpack_require__(/*! ./logger */ \"./src/desktop/logger/index.ts\");\n\n__webpack_require__(/*! reflect-metadata */ \"reflect-metadata\");\n\n__webpack_require__(/*! ../common/extensions */ \"./src/common/extensions/index.ts\");\n\nvar _constants = __webpack_require__(/*! ./constants */ \"./src/desktop/constants.ts\");\n\nvar _startup = __webpack_require__(/*! ./startup */ \"./src/desktop/startup.ts\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\n_electron.app.setPath(\"userData\", path.join(_electron.app.getPath(\"appData\"), \"coglite\")); // 3. Initialize the logger -- \n//this doesn't actually init anything now,the logger works already\n// just could wrap it in a fn to set the default if u wanted\n\n\nvar mainhtml = _constants.Constants.urls.main;\nconsole.log(mainhtml);\n(0, _startup.startCogliteDesktop)().catch(e => {\n  _logger.logger.error(\"Error starting batchlabs\", e);\n});\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(mainhtml, \"mainhtml\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\main.ts\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/desktop/main.ts?");

/***/ }),

/***/ "./src/desktop/python-process/index.ts":
/*!*********************************************!*\
  !*** ./src/desktop/python-process/index.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _pythonRpcServerProcess = __webpack_require__(/*! ./python-rpc-server-process */ \"./src/desktop/python-process/python-rpc-server-process.ts\");\n\nObject.keys(_pythonRpcServerProcess).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function () {\n      return _pythonRpcServerProcess[key];\n    }\n  });\n});\n\nvar _pythonExecutable = __webpack_require__(/*! ./python-executable */ \"./src/desktop/python-process/python-executable.ts\");\n\nObject.keys(_pythonExecutable).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function () {\n      return _pythonExecutable[key];\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/desktop/python-process/index.ts?");

/***/ }),

/***/ "./src/desktop/python-process/python-executable.ts":
/*!*********************************************************!*\
  !*** ./src/desktop/python-process/python-executable.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.tryPython = tryPython;\nexports.tryMultiplePythons = tryMultiplePythons;\nexports.getPythonPath = getPythonPath;\nexports.PythonExecutableNotFoundError = exports.PythonExecutableError = void 0;\n\nvar _core = __webpack_require__(/*! ../core */ \"./src/desktop/core/index.ts\");\n\nvar _logger = __webpack_require__(/*! ../logger */ \"./src/desktop/logger/index.ts\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar shell = __webpack_require__(/*! shelljs */ \"shelljs\");\n\nvar pythonCheck = shell.which('python');\nvar jupyterCheck = shell.which('jupyter');\nvar pythonExecPath = pythonCheck.stdout;\nvar jupyterExecPath = jupyterCheck.stdout;\nlet computedPythonPath = pythonExecPath;\n\nclass PythonExecutableError extends Error {\n  constructor(message) {\n    super();\n    this.message = message;\n  }\n\n  __reactstandin__regenerateByEval(key, code) {\n    this[key] = eval(code);\n  }\n\n}\n\nexports.PythonExecutableError = PythonExecutableError;\n\nclass PythonExecutableNotFoundError extends PythonExecutableError {\n  constructor(executable) {\n    super(`Python exec \"${executable}\" is not found.`);\n    this.executable = executable;\n  }\n\n  __reactstandin__regenerateByEval(key, code) {\n    this[key] = eval(code);\n  }\n\n}\n/**\r\n * Try the given python path to see if it exists and is of a valid version.\r\n * @param pythonPath Path to the python executable\r\n * @returns Promise with the python path if it is a valid python environment or reject with the error.\r\n */\n\n\nexports.PythonExecutableNotFoundError = PythonExecutableNotFoundError;\n\nfunction tryPython(pythonPath) {\n  return (0, _core.execCommand)(`${pythonPath} --version`).then(({\n    stdout\n  }) => {\n    const pythonVersion = parsePythonVersion(stdout);\n\n    if (!pythonVersion) {\n      throw new PythonExecutableError(`Could not parse python version from string ${stdout}`);\n    }\n\n    if (!isValidVersion(pythonVersion)) {\n      throw new PythonExecutableError(`Python version is not valid please install python >= 3.6`);\n    }\n\n    return pythonPath;\n  }).catch(error => {\n    return Promise.reject(new PythonExecutableNotFoundError(pythonPath));\n  });\n}\n/**\r\n * Try a list of python paths sequentially. As soon as 1 valid path is found it resolve this one.\r\n * @param paths List of python executable paths.\r\n * @returns Promise that resolve the first valid path. If no path are valid reject with an error.\r\n */\n\n\nfunction tryMultiplePythons(paths) {\n  const errors = {};\n\n  if (paths.length === 0) {\n    return Promise.reject({});\n  }\n\n  const firstPath = paths[0];\n  return tryPython(firstPath).then(() => {\n    return firstPath;\n  }).catch(error => {\n    return tryMultiplePythons(paths.slice(1)).catch(errors => {\n      return Promise.reject(_objectSpread({}, errors, {\n        [firstPath]: error\n      }));\n    });\n  });\n}\n/**\r\n * Retrieve the python path that should be used for batch labs.\r\n * It will only look for the python executable on the first run. It will then used the cached value\r\n */\n\n\nfunction getPythonPath() {\n  if (computedPythonPath) {\n    return Promise.resolve(computedPythonPath);\n  }\n\n  const envPython = process.env.BL_PYTHON_PATH;\n  return tryMultiplePythons([envPython, \"python3\", \"python\"].filter(x => Boolean(x))).then(path => {\n    computedPythonPath = path;\n    return path;\n  }).catch(errors => {\n    let msg = \"Fail to find a valid python 3.6 installation:\";\n\n    for (let path of Object.keys(errors)) {\n      msg += `\\n  - ${path}: ${errors[path].message}`;\n    }\n\n    _logger.logger.error(msg);\n\n    return null;\n  });\n}\n\nconst pythonVersionRegex = /Python\\s*(\\d+)\\.(\\d+)\\.(\\d+)/;\n\n/**\r\n * Parse the version from the stdout\r\n * @param str Stdout of running python --version\r\n */\nfunction parsePythonVersion(str) {\n  const out = pythonVersionRegex.exec(str);\n\n  if (!out || out.length < 4) {\n    return null;\n  } else {\n    return {\n      major: parseInt(out[1], 10),\n      minor: parseInt(out[2], 10),\n      patch: parseInt(out[3], 10)\n    };\n  }\n}\n/**\r\n * Check if the version is the right for batchlabs.\r\n * @param version Python version\r\n */\n\n\nfunction isValidVersion(version) {\n  return version.major === 3 && version.minor >= 5;\n}\n\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(pythonCheck, \"pythonCheck\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\python-process\\\\python-executable.ts\");\n  reactHotLoader.register(jupyterCheck, \"jupyterCheck\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\python-process\\\\python-executable.ts\");\n  reactHotLoader.register(pythonExecPath, \"pythonExecPath\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\python-process\\\\python-executable.ts\");\n  reactHotLoader.register(jupyterExecPath, \"jupyterExecPath\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\python-process\\\\python-executable.ts\");\n  reactHotLoader.register(computedPythonPath, \"computedPythonPath\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\python-process\\\\python-executable.ts\");\n  reactHotLoader.register(PythonExecutableError, \"PythonExecutableError\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\python-process\\\\python-executable.ts\");\n  reactHotLoader.register(PythonExecutableNotFoundError, \"PythonExecutableNotFoundError\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\python-process\\\\python-executable.ts\");\n  reactHotLoader.register(tryPython, \"tryPython\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\python-process\\\\python-executable.ts\");\n  reactHotLoader.register(tryMultiplePythons, \"tryMultiplePythons\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\python-process\\\\python-executable.ts\");\n  reactHotLoader.register(getPythonPath, \"getPythonPath\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\python-process\\\\python-executable.ts\");\n  reactHotLoader.register(pythonVersionRegex, \"pythonVersionRegex\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\python-process\\\\python-executable.ts\");\n  reactHotLoader.register(parsePythonVersion, \"parsePythonVersion\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\python-process\\\\python-executable.ts\");\n  reactHotLoader.register(isValidVersion, \"isValidVersion\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\python-process\\\\python-executable.ts\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/desktop/python-process/python-executable.ts?");

/***/ }),

/***/ "./src/desktop/python-process/python-rpc-server-process.ts":
/*!*****************************************************************!*\
  !*** ./src/desktop/python-process/python-rpc-server-process.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.PythonRpcServerProcess = void 0;\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar _constants = __webpack_require__(/*! ../constants */ \"./src/desktop/constants.ts\");\n\nvar _logger = __webpack_require__(/*! ../logger */ \"./src/desktop/logger/index.ts\");\n\nvar _pythonExecutable = __webpack_require__(/*! ./python-executable */ \"./src/desktop/python-process/python-executable.ts\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nconst asarPath = path.join(_constants.Constants.root, \"../python-rpc/main\");\nconst localPath = path.join(_constants.Constants.root, \"python/main.py\");\nconst logsFolder = _constants.Constants.logsFolder;\n\nclass PythonRpcServerProcess {\n  constructor() {\n    this._spawedProcess = void 0;\n    this._askForKill = void 0;\n  }\n\n  /** Starts the python serverPromise when the process has spawned */\n  start() {\n    this._askForKill = false;\n    return this._getCommandLine().then(data => {\n      _logger.logger.info(\"Python path is\", data.cmd, {\n        args: data.args\n      });\n\n      const child = this._spawedProcess = (0, _child_process.spawn)(data.cmd, [...data.args]);\n\n      _logger.pythonLogger.info(\"========================= STARTING PYTHON RPC SERVER PROCESS =========================\");\n\n      child.stdout.on(\"data\", data => {\n        _logger.pythonLogger.info(data.toString());\n      });\n      child.stderr.on(\"data\", data => {\n        _logger.pythonLogger.error(data.toString());\n      });\n      child.on(\"exit\", code => {\n        if (this._askForKill) {\n          _logger.logger.info(\"Python rpc server has stopped!\");\n        } else {\n          _logger.logger.error(\"Python Rpc server has exited unexpectedly with code!\", code);\n        }\n      });\n\n      _logger.logger.info(\"Python Rpc server started!\");\n    });\n  }\n\n  stop() {\n    if (this._spawedProcess) {\n      this._askForKill = true;\n\n      _logger.logger.info(\"Stopping python rpc server!\");\n\n      this._spawedProcess.kill();\n    }\n  }\n\n  restart() {\n    this.stop();\n    this.start();\n  }\n\n  async _getCommandLine() {\n    const portPromise = process.env.HOT ? _constants.Constants.pythonServerPort.dev : _constants.Constants.pythonServerPort.prod;\n    return portPromise.then(port => {\n      const portString = port.toString();\n\n      if (_constants.Constants.isAsar) {\n        return {\n          cmd: asarPath,\n          args: [portString]\n        };\n      } else {\n        return (0, _pythonExecutable.getPythonPath)().then(pythonPath => {\n          return {\n            cmd: pythonPath,\n            args: [localPath, portString]\n          };\n        });\n      }\n    });\n  }\n\n  __reactstandin__regenerateByEval(key, code) {\n    this[key] = eval(code);\n  }\n\n}\n\nexports.PythonRpcServerProcess = PythonRpcServerProcess;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(asarPath, \"asarPath\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\python-process\\\\python-rpc-server-process.ts\");\n  reactHotLoader.register(localPath, \"localPath\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\python-process\\\\python-rpc-server-process.ts\");\n  reactHotLoader.register(logsFolder, \"logsFolder\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\python-process\\\\python-rpc-server-process.ts\");\n  reactHotLoader.register(PythonRpcServerProcess, \"PythonRpcServerProcess\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\python-process\\\\python-rpc-server-process.ts\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/desktop/python-process/python-rpc-server-process.ts?");

/***/ }),

/***/ "./src/desktop/startup.ts":
/*!********************************!*\
  !*** ./src/desktop/startup.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.startCogliteDesktop = startCogliteDesktop;\n\nvar _electron = __webpack_require__(/*! electron */ \"electron\");\n\nvar _core = __webpack_require__(/*! ./core */ \"./src/desktop/core/index.ts\");\n\nvar _pythonProcess = __webpack_require__(/*! ./python-process */ \"./src/desktop/python-process/index.ts\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nconst pythonServer = new _pythonProcess.PythonRpcServerProcess();\npythonServer.start();\nvar cogliteApp;\n\nfunction registerAuthProtocol() {\n  _electron.protocol.registerStringProtocol(\"urn\", (request, callback) => {\n    callback();\n  });\n}\n\nasync function startApplication(cogliteApp) {\n  registerAuthProtocol();\n  cogliteApp.registerCoreServices().then(() => {\n    cogliteApp.start();\n  });\n}\n\nasync function startCogliteDesktop() {\n  //localStorage.load();\n  const cogliteApp = new _core.CogliteDesktopApp();\n\n  if (_electron.app.isReady()) {\n    startApplication(cogliteApp);\n  } else {\n    _electron.app.on(\"ready\", async () => {\n      startApplication(cogliteApp);\n    });\n  }\n\n  (0, _core.listenToSelectCertifcateEvent)();\n  process.on(\"exit\", () => {\n    cogliteApp.quit();\n    pythonServer.stop();\n  });\n  process.on(\"SIGINT\", () => {\n    process.exit(-1);\n  });\n  process.on(\"SIGINT\", () => {\n    process.exit(-2);\n  });\n}\n\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(pythonServer, \"pythonServer\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\startup.ts\");\n  reactHotLoader.register(cogliteApp, \"cogliteApp\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\startup.ts\");\n  reactHotLoader.register(registerAuthProtocol, \"registerAuthProtocol\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\startup.ts\");\n  reactHotLoader.register(startApplication, \"startApplication\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\startup.ts\");\n  reactHotLoader.register(startCogliteDesktop, \"startCogliteDesktop\", \"D:\\\\code\\\\blueprintJS\\\\@wip\\\\dev-webpack-electron-rpc\\\\src\\\\desktop\\\\startup.ts\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/desktop/startup.ts?");

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

/***/ "module":
/*!*************************!*\
  !*** external "module" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"module\");\n\n//# sourceURL=webpack:///external_%22module%22?");

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

/***/ "react-hot-loader":
/*!***********************************!*\
  !*** external "react-hot-loader" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-hot-loader\");\n\n//# sourceURL=webpack:///external_%22react-hot-loader%22?");

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