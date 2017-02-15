/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var hasList = function hasList(element) {
    return element.find(function (child) {
      return child.name === 'ol' || child.name === 'ul';
    }, true).length > 0;
  };

  CKEDITOR.dtd.$editable.span = 1;
  CKEDITOR.plugins.add('exceptionlist', {
    requires: 'widget',
    icons: 'exceptionlist',
    init: function init(editor) {
      editor.widgets.add('exceptionlist', {
        button: 'Add an exception list',

        template: '<div class="exception">\n            <p>\n              <span class="run_in">\n                <span class="bold">Exceptions:</span>\n              </span>\n              Add optional paragraph text here\n            </p>\n            <div class="list">\n              <ol class="no_mark">\n                <li>\n                  <p>\n                    <span class="label">1.</span> Exception list item\n                  </p>\n                </li>\n                <li>\n                  <p>\n                    <span class="label">2.</span> Exception list item\n                  </p>\n                </li>\n              </ol>            \n            </div>\n          </div>',

        editables: {
          content: {
            selector: '.exception p'
          },
          list: {
            selector: 'div.list'
          }
        },

        allowedContent: 'div(!exception); span(!run_in); div(!list);',
        requiredContent: 'div(exception); span(run_in); div(list);',

        upcast: function upcast(element) {
          return element.name === 'div' && element.hasClass('exception') && hasList(element);
        }
      });
    }
  });
})();

/***/ })
/******/ ]);