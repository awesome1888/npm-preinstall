#!/usr/bin/env node
module.exports =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/execute.js":
/*!************************!*\
  !*** ./src/execute.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! child_process */ \"child_process\");\n/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar execute = function execute(cmd) {\n  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];\n  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n  args = args || [];\n  var stdoutTo = params.stdoutTo || process.stdout;\n  var stderrTo = params.stderrTo || process.stderr;\n  var cwd = params.cwd || process.cwd;\n  return new Promise(function (resolve) {\n    var handle = Object(child_process__WEBPACK_IMPORTED_MODULE_0__[\"spawn\"])(cmd, args, {\n      cwd: cwd,\n      stdio: 'inherit',\n      shell: true\n    });\n\n    if (stdoutTo && handle.stdout) {\n      handle.stdout.pipe(stdoutTo);\n    }\n\n    if (stderrTo && handle.stderr) {\n      handle.stderr.pipe(stderrTo);\n    }\n\n    handle.on('error', function () {\n      resolve(1);\n    });\n    handle.on('close', function (code) {\n      resolve(code);\n    });\n    handle.on('exit', function (code) {\n      resolve(code);\n    });\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (execute);\n\n//# sourceURL=webpack:///./src/execute.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/polyfill */ \"@babel/polyfill\");\n/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ \"debug\");\n/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _execute__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./execute */ \"./src/execute.js\");\n/* harmony import */ var fs_equal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! fs-equal */ \"fs-equal\");\n/* harmony import */ var fs_equal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fs_equal__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var fs_copy_file_sync__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! fs-copy-file-sync */ \"fs-copy-file-sync\");\n/* harmony import */ var fs_copy_file_sync__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(fs_copy_file_sync__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var copy_dir__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! copy-dir */ \"copy-dir\");\n/* harmony import */ var copy_dir__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(copy_dir__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var glob__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! glob */ \"glob\");\n/* harmony import */ var glob__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(glob__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash.get */ \"lodash.get\");\n/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_9__);\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\n\n\n\n\n\n\n\n\nvar installTo =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(folder) {\n    var file, fileLock, equal, overrides, nodeModules;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            file = path__WEBPACK_IMPORTED_MODULE_2___default.a.join(folder, 'package.json');\n            fileLock = path__WEBPACK_IMPORTED_MODULE_2___default.a.join(folder, 'node_modules/.packagejson.lock');\n\n            if (!fs__WEBPACK_IMPORTED_MODULE_1___default.a.existsSync(file)) {\n              _context.next = 23;\n              break;\n            }\n\n            equal = false;\n            _context.prev = 4;\n            _context.next = 7;\n            return Object(fs_equal__WEBPACK_IMPORTED_MODULE_5__[\"areFilesEqual\"])(file, fileLock);\n\n          case 7:\n            equal = _context.sent;\n            _context.next = 12;\n            break;\n\n          case 10:\n            _context.prev = 10;\n            _context.t0 = _context[\"catch\"](4);\n\n          case 12:\n            if (equal) {\n              _context.next = 23;\n              break;\n            }\n\n            console.log(\">>> Re-installing packages in \\\"\".concat(folder, \"\\\"\"));\n            _context.next = 16;\n            return Object(_execute__WEBPACK_IMPORTED_MODULE_4__[\"default\"])('npm', ['install'], {\n              cwd: folder\n            });\n\n          case 16:\n            fs_copy_file_sync__WEBPACK_IMPORTED_MODULE_6___default()(file, fileLock);\n            overrides = path__WEBPACK_IMPORTED_MODULE_2___default.a.join(folder, '.node_modules_patches');\n            nodeModules = path__WEBPACK_IMPORTED_MODULE_2___default.a.join(folder, '.node_modules');\n\n            if (!fs__WEBPACK_IMPORTED_MODULE_1___default.a.existsSync(overrides)) {\n              _context.next = 23;\n              break;\n            }\n\n            console.log('>>>>>> Applying node_modules monkey-patch 🙈');\n            _context.next = 23;\n            return new Promise(function (resolve, reject) {\n              copy_dir__WEBPACK_IMPORTED_MODULE_7___default()(overrides, nodeModules, function (err) {\n                if (err) {\n                  reject(err);\n                } else {\n                  resolve();\n                }\n              });\n            });\n\n          case 23:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, this, [[4, 10]]);\n  }));\n\n  return function installTo(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nvar getPackages =\n/*#__PURE__*/\nfunction () {\n  var _ref2 = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee2(pattern, cwd) {\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            return _context2.abrupt(\"return\", new Promise(function (resolve, reject) {\n              glob__WEBPACK_IMPORTED_MODULE_8___default()(pattern, {\n                cwd: cwd\n              }, function (err, files) {\n                if (err) {\n                  reject(err);\n                } else {\n                  resolve(files);\n                }\n              });\n            }));\n\n          case 1:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2, this);\n  }));\n\n  return function getPackages(_x2, _x3) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\n_asyncToGenerator(\n/*#__PURE__*/\nregeneratorRuntime.mark(function _callee3() {\n  var d, cwd, cmdToRun, rootPackageJson, content, packageWildCard, packages, i, pkg;\n  return regeneratorRuntime.wrap(function _callee3$(_context3) {\n    while (1) {\n      switch (_context3.prev = _context3.next) {\n        case 0:\n          d = debug__WEBPACK_IMPORTED_MODULE_3___default()('main');\n          cwd = process.cwd();\n          process.argv.shift(); // drop the \"node\" command\n\n          process.argv.shift(); // drop the file name\n\n          cmdToRun = process.argv.shift();\n          rootPackageJson = path__WEBPACK_IMPORTED_MODULE_2___default.a.join(cwd, 'package.json');\n\n          if (!(cmdToRun === '--monorepo')) {\n            _context3.next = 27;\n            break;\n          }\n\n          if (!fs__WEBPACK_IMPORTED_MODULE_1___default.a.existsSync(rootPackageJson)) {\n            _context3.next = 25;\n            break;\n          }\n\n          content = null;\n\n          try {\n            content = JSON.parse(fs__WEBPACK_IMPORTED_MODULE_1___default.a.readFileSync(rootPackageJson));\n          } catch (e) {}\n\n          packageWildCard = null;\n\n          if (content) {\n            packageWildCard = lodash_get__WEBPACK_IMPORTED_MODULE_9___default()(content, 'workspaces.packages.0');\n          }\n\n          if (!packageWildCard) {\n            _context3.next = 25;\n            break;\n          }\n\n          _context3.next = 15;\n          return getPackages(packageWildCard, cwd);\n\n        case 15:\n          packages = _context3.sent;\n\n          if (!(packages && packages.length)) {\n            _context3.next = 25;\n            break;\n          }\n\n          i = 0;\n\n        case 18:\n          if (!(i < packages.length)) {\n            _context3.next = 25;\n            break;\n          }\n\n          pkg = packages[i];\n          _context3.next = 22;\n          return installTo(path__WEBPACK_IMPORTED_MODULE_2___default.a.join(cwd, pkg));\n\n        case 22:\n          i++;\n          _context3.next = 18;\n          break;\n\n        case 25:\n          _context3.next = 34;\n          break;\n\n        case 27:\n          _context3.next = 29;\n          return installTo(cwd);\n\n        case 29:\n          d(process.argv.join(' '));\n\n          if (!(cmdToRun && cmdToRun.length)) {\n            _context3.next = 34;\n            break;\n          }\n\n          debug__WEBPACK_IMPORTED_MODULE_3___default()(\"Executing \".concat(cmdToRun));\n          _context3.next = 34;\n          return Object(_execute__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(cmdToRun, process.argv);\n\n        case 34:\n          d('Done');\n\n        case 35:\n        case \"end\":\n          return _context3.stop();\n      }\n    }\n  }, _callee3, this);\n}))();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "@babel/polyfill":
/*!**********************************!*\
  !*** external "@babel/polyfill" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/polyfill\");\n\n//# sourceURL=webpack:///external_%22@babel/polyfill%22?");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"child_process\");\n\n//# sourceURL=webpack:///external_%22child_process%22?");

/***/ }),

/***/ "copy-dir":
/*!***************************!*\
  !*** external "copy-dir" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"copy-dir\");\n\n//# sourceURL=webpack:///external_%22copy-dir%22?");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"debug\");\n\n//# sourceURL=webpack:///external_%22debug%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "fs-copy-file-sync":
/*!************************************!*\
  !*** external "fs-copy-file-sync" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs-copy-file-sync\");\n\n//# sourceURL=webpack:///external_%22fs-copy-file-sync%22?");

/***/ }),

/***/ "fs-equal":
/*!***************************!*\
  !*** external "fs-equal" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs-equal\");\n\n//# sourceURL=webpack:///external_%22fs-equal%22?");

/***/ }),

/***/ "glob":
/*!***********************!*\
  !*** external "glob" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"glob\");\n\n//# sourceURL=webpack:///external_%22glob%22?");

/***/ }),

/***/ "lodash.get":
/*!*****************************!*\
  !*** external "lodash.get" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash.get\");\n\n//# sourceURL=webpack:///external_%22lodash.get%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });