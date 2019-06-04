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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var hasList = exports.hasList = function hasList(element) {
    return find(element, function (child) {
        return child.name === 'ol' || child.name === 'ul';
    }, true).length > 0;
};

/**
 * Implementation of CKEDITOR.htmlParser.element.find() that was added in 4.6 for backwards compatibility reasons.
 *
 * @param {CKEDITOR.htmlParser.element} element
 * @param {function|string}             criteria
 * @param {boolean}                     recursive
 *
 * @returns {Array}
 */
var find = exports.find = function find(element, criteria) {
    var recursive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (element.find) {
        return element.find(criteria, recursive);
    }

    var ret = [];

    for (var i = 0; i < element.children.length; i++) {
        var curChild = element.children[i];

        if (typeof criteria == 'function' && criteria(curChild)) {
            ret.push(curChild);
        } else if (typeof criteria == 'string' && curChild.name === criteria) {
            ret.push(curChild);
        }

        if (recursive && curChild.type === CKEDITOR.NODE_ELEMENT) {
            ret = ret.concat(find(curChild, criteria, recursive));
        }
    }

    return ret;
};

exports.default = {
    hasList: hasList
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _common = __webpack_require__(0);

(function () {
  CKEDITOR.dtd.$editable.span = 1;
  CKEDITOR.plugins.add('standardexception', {
    requires: 'widget',
    icons: 'standardexception',
    init: function init(editor) {
      // If the target element has a list ancestor, dispatch a custom event with its id.
      editor.on('doubleclick', function (evt) {
        var target = evt.data.element;
        var exceptionAscendant = target.getAscendant(function (el) {
          return el && el.getName && el.getName() === 'div' && el.hasClass('exception');
        });

        var listDescendant = exceptionAscendant ? exceptionAscendant.find('ul, ol') : false;

        if (exceptionAscendant && listDescendant.count() === 0) {
          var wizardCreatedEvent = new CustomEvent('exception-edit', { detail: exceptionAscendant.getAttribute('id') });

          var _target = document.getElementById('exception-event-listener');
          _target && _target.dispatchEvent(wizardCreatedEvent);
        }
      });

      editor.on('key', function (evt) {
        // Use getKey directly in order to ignore modifiers.
        // Justification: http://dev.ckeditor.com/ticket/11861#comment:13
        var domEvent = evt.data.domEvent;
        var sel = editor.getSelection();
        var range = sel.getRanges()[0];

        if (!range || !range.collapsed) {
          return;
        }

        var start = range.startContainer;
        var ascendant = start.getAscendant(function (el) {
          return el && el.getName && el.getName() === 'div' && el.hasClass('exception');
        });

        if (ascendant) {
          // Cancel all key events so the list cannot be edited directly
          if (typeof domEvent.cancelable !== 'boolean' || domEvent.cancelable) {
            domEvent.preventDefault();
          }
        }
      });

      editor.widgets.add('standardexception', {
        button: 'Add a standard exception',

        template: '<div class="exception">\n              <p>\n                <span class="run_in">\n                  <span class="bold">Exception:</span>\n                </span>\n                Exception content...\n              </p>\n            </div>',

        editables: {
          content: {
            selector: '.exception p'
          },
          exceptionContent: {
            selector: '.exception_content'
          }
        },

        allowedContent: 'div(!exception); span(!run_in);',
        requiredContent: 'div(exception); span(run_in);',

        upcast: function upcast(element) {
          return element.name === 'div' && element.hasClass('exception') && !(0, _common.hasList)(element);
        }
      });
    }
  });
})();

/***/ })
/******/ ]);