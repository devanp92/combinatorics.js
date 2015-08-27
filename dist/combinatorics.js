/**
 * combinatorics.js
 * https://github.com/devanp92/combinatoricsjs
 *
 * Combinatorics.js is a standalone math library for Javascript and Node.js. It features a solution to work with Permutations, Posets, Trees, and other enumerative collections.
 *
 * @version 0.0.1
 * @date    2015-08-23
 *
 * @license
 * Copyright (C) 2013-2015 Jos de Jong <wjosdejong@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["combinatorics"] = factory();
	else
		root["combinatorics"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(1);

	/**
	 * combinatorics.js factory function. Creates a new instance of combinatorics.js
	 */
	function create (config) {
	  // create a new comb.js instance
	  var comb = core.create(config);
	  comb.create = create;

	  // import data types, functions, constants, expression parser, etc.
	  comb.import(__webpack_require__(6));

	  return comb;
	}

	// return a new instance of comb.js
	module.exports = create();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var isFactory = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./../utils/object\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).isFactory;
	var deepExtend = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./../utils/object\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).deepExtend;
	var typedFactory = __webpack_require__(3);
	var emitter = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./../utils/emitter\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var importFactory = __webpack_require__(4);
	var configFactory = __webpack_require__(5);

	/**
	 * Combinatorics.js core. Creates a new, empty comb.js instance
	 * @param {Object} [options] Available options:
	 *                            {number} epsilon
	 *                              Minimum relative difference between two
	 *                              compared values, used by all comparison functions.
	 *                            {string} matrix
	 *                              A string 'matrix' (default) or 'array'.
	 *                            {string} number
	 *                              A string 'number' (default), 'bignumber', or 'fraction'
	 *                            {number} precision
	 *                              The number of significant digits for BigNumbers.
	 *                              Not applicable for Numbers.
	 *                            {boolean} predictable
	 *                              Predictable output type of functions. When true,
	 *                              output type depends only on the input types. When
	 *                              false (default), output type can vary depending
	 *                              on input values. For example `math.sqrt(-2)`
	 *                              returns `NaN` when predictable is false, and
	 *                              returns `complex('2i')` when true.
	 * @returns {Object} Returns a bare-bone math.js instance containing
	 *                   functions:
	 *                   - `import` to add new functions
	 *                   - `config` to change configuration
	 *                   - `on`, `off`, `once`, `emit` for events
	 */
	exports.create = function create (options) {
	  // simple test for ES5 support
	  if (typeof Object.create !== 'function') {
	    throw new Error('ES5 not supported by this JavaScript engine. ' +
	    'Please load the es5-shim and es5-sham library for compatibility.');
	  }

	  // cached factories and instances
	  var factories = [];
	  var instances = [];

	  // create a namespace for the mathjs instance, and attach emitter functions
	  var comb = emitter.mixin({});
	  comb.type = {};
	  comb.expression = {
	    transform: Object.create(comb)
	  };

	  // create a new typed instance
	  comb.typed = typedFactory.create(comb.type);

	  // create configuration options. These are private
	  var _config = {
	    // minimum relative difference between two compared values,
	    // used by all comparison functions
	    epsilon: 1e-14,

	    // type of default matrix output. Choose 'matrix' (default) or 'array'
	    matrix: 'matrix',

	    // type of default number output. Choose 'number' (default) or 'bignumber'
	    number: 'number',

	    // number of significant digits in BigNumbers
	    precision: 64,

	    // predictable output type of functions. When true, output type depends only
	    // on the input types. When false (default), output type can vary depending
	    // on input values. For example `comb.sqrt(-2)` returns `NaN` when
	    // predictable is false, and returns `complex('2i')` when true.
	    predictable: false
	  };

	  if (options) {
	    // merge options
	    deepExtend(_config, options);
	  }

	  /**
	   * Load a function or data type from a factory.
	   * If the function or data type already exists, the existing instance is
	   * returned.
	   * @param {{type: string, name: string, factory: Function}} factory
	   * @returns {*}
	   */
	  function load (factory) {
	    if (!isFactory(factory)) {
	      throw new Error('Factory object with properties `type`, `name`, and `factory` expected');
	    }

	    var index = factories.indexOf(factory);
	    var instance;
	    if (index === -1) {
	      // doesn't yet exist
	      if (factory.comb === true) {
	        // pass with comb namespace
	        instance = factory.factory(comb.type, _config, load, comb.typed, comb);
	      }
	      else {
	        instance = factory.factory(comb.type, _config, load, comb.typed);
	      }

	      // append to the cache
	      factories.push(factory);
	      instances.push(instance);
	    }
	    else {
	      // already existing function, return the cached instance
	      instance = instances[index];
	    }

	    return instance;
	  }

	  // load the import and config functions
	  comb['import'] = load(importFactory);
	  comb['config'] = load(configFactory);

	  return comb;
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var typedFunction = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"typed-function\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var digits = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./../utils/number\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).digits;

	// returns a new instance of typed-function
	var createTyped = function () {
	  // initially, return the original instance of typed-function
	  // consecutively, return a new instance from typed.create.
	  createTyped = typedFunction.create;
	  return typedFunction;
	};

	/**
	 * Factory function for creating a new typed instance
	 * @param {Object} type   Object with data types like Complex and BigNumber
	 * @returns {Function}
	 */
	exports.create = function create(type) {
	  // TODO: typed-function must be able to silently ignore signatures with unknown data types

	  // get a new instance of typed-function
	  var typed = createTyped();

	  // define all types. The order of the types determines in which order function
	  // arguments are type-checked (so for performance it's important to put the
	  // most used types first).
	  typed.types = [
	    { name: 'number',               test: function (x) { return typeof x === 'number'; } },
	    { name: 'Complex',              test: function (x) { return x && x.isComplex; } },
	    { name: 'BigNumber',            test: function (x) { return x && x.isBigNumber; } },
	    { name: 'Fraction',             test: function (x) { return x && x.isFraction; } },
	    { name: 'Unit',                 test: function (x) { return x && x.isUnit; } },
	    { name: 'string',               test: function (x) { return typeof x === 'string'; } },
	    { name: 'Array',                test: Array.isArray },
	    { name: 'Matrix',               test: function (x) { return x && x.isMatrix; } },
	    { name: 'DenseMatrix',          test: function (x) { return x && x.isDenseMatrix; } },
	    { name: 'SparseMatrix',         test: function (x) { return x && x.isSparseMatrix; } },
	    { name: 'ImmutableDenseMatrix', test: function (x) { return x && x.isImmutableDenseMatrix; } },
	    { name: 'Range',                test: function (x) { return x && x.isRange; } },
	    { name: 'Index',                test: function (x) { return x && x.isIndex; } },
	    { name: 'boolean',              test: function (x) { return typeof x === 'boolean'; } },
	    { name: 'ResultSet',            test: function (x) { return x && x.isResultSet; } },
	    { name: 'Help',                 test: function (x) { return x && x.isHelp; } },
	    { name: 'function',             test: function (x) { return typeof x === 'function';} },
	    { name: 'Date',                 test: function (x) { return x instanceof Date; } },
	    { name: 'RegExp',               test: function (x) { return x instanceof RegExp; } },
	    { name: 'Object',               test: function (x) { return typeof x === 'object'; } },
	    { name: 'null',                 test: function (x) { return x === null; } },
	    { name: 'undefined',            test: function (x) { return x === undefined; } }
	  ];

	  // TODO: add conversion from BigNumber to number?
	  typed.conversions = [
	    {
	      from: 'number',
	      to: 'BigNumber',
	      convert: function (x) {
	        // note: conversion from number to BigNumber can fail if x has >15 digits
	        if (digits(x) > 15) {
	          throw new TypeError('Cannot implicitly convert a number with >15 significant digits to BigNumber ' +
	          '(value: ' + x + '). ' +
	          'Use function bignumber(x) to convert to BigNumber.');
	        }
	        return new type.BigNumber(x);
	      }
	    }, {
	      from: 'number',
	      to: 'Complex',
	      convert: function (x) {
	        return new type.Complex(x, 0);
	      }
	    }, {
	      from: 'number',
	      to: 'string',
	      convert: function (x) {
	        return x + '';
	      }
	    }, {
	      from: 'BigNumber',
	      to: 'Complex',
	      convert: function (x) {
	        return new type.Complex(x.toNumber(), 0);
	      }
	    }, {
	      from: 'number',
	      to: 'Fraction',
	      convert: function (x) {
	        if (digits(x) > 15) {
	          throw new TypeError('Cannot implicitly convert a number with >15 significant digits to Fraction ' +
	              '(value: ' + x + '). ' +
	              'Use function fraction(x) to convert to Fraction.');
	        }
	        return new type.Fraction(x);
	      }
	    }, {
	      from: 'string',
	      to: 'number',
	      convert: function (x) {
	        var n = Number(x);
	        if (isNaN(n)) {
	          throw new Error('Cannot convert "' + x + '" to a number');
	        }
	        return n;
	      }
	    }, {
	      from: 'boolean',
	      to: 'number',
	      convert: function (x) {
	        return +x;
	      }
	    }, {
	      from: 'boolean',
	      to: 'BigNumber',
	      convert: function (x) {
	        return new type.BigNumber(+x);
	      }
	    }, {
	      from: 'boolean',
	      to: 'string',
	      convert: function (x) {
	        return +x;
	      }
	    }, {
	      from: 'null',
	      to: 'number',
	      convert: function () {
	        return 0;
	      }
	    }, {
	      from: 'null',
	      to: 'string',
	      convert: function () {
	        return 'null';
	      }
	    }, {
	      from: 'null',
	      to: 'BigNumber',
	      convert: function () {
	        return new type.BigNumber(0);
	      }
	    }, {
	      from: 'Array',
	      to: 'Matrix',
	      convert: function (array) {
	        // TODO: how to decide on the right type of matrix to create?
	        return new type.DenseMatrix(array);
	      }
	    }, {
	      from: 'Matrix',
	      to: 'Array',
	      convert: function (matrix) {
	        return matrix.valueOf();
	      }
	    }
	  ];

	  return typed;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var lazy = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../utils/object\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).lazy;
	var isFactory = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../utils/object\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).isFactory;
	var traverse = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../utils/object\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).traverse;
	var extend = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../utils/object\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).extend;
	var ArgumentsError = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../error/ArgumentsError\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	function factory (type, config, load, typed, math) {
	  /**
	   * Import functions from an object or a module
	   *
	   * Syntax:
	   *
	   *    math.import(object)
	   *    math.import(object, options)
	   *
	   * Where:
	   *
	   * - `object: Object`
	   *   An object with functions to be imported.
	   * - `options: Object` An object with import options. Available options:
	   *   - `override: boolean`
	   *     If true, existing functions will be overwritten. False by default.
	   *   - `silent: boolean`
	   *     If true, the function will not throw errors on duplicates or invalid
	   *     types. False by default.
	   *   - `wrap: boolean`
	   *     If true, the functions will be wrapped in a wrapper function
	   *     which converts data types like Matrix to primitive data types like Array.
	   *     The wrapper is needed when extending math.js with libraries which do not
	   *     support these data type. False by default.
	   *
	   * Examples:
	   *
	   *    // define new functions and variables
	   *    math.import({
	   *      myvalue: 42,
	   *      hello: function (name) {
	   *        return 'hello, ' + name + '!';
	   *      }
	   *    });
	   *
	   *    // use the imported function and variable
	   *    math.myvalue * 2;               // 84
	   *    math.hello('user');             // 'hello, user!'
	   *
	   *    // import the npm module 'numbers'
	   *    // (must be installed first with `npm install numbers`)
	   *    math.import(require('numbers'), {wrap: true});
	   *
	   *    math.fibonacci(7); // returns 13
	   *
	   * @param {Object | Array} object   Object with functions to be imported.
	   * @param {Object} [options]        Import options.
	   */
	  function math_import(object, options) {
	    var num = arguments.length;
	    if (num != 1 && num != 2) {
	      throw new ArgumentsError('import', num, 1, 2);
	    }

	    if (!options) {
	      options = {};
	    }

	    if (isFactory(object)) {
	      _importFactory(object, options);
	    }
	    else if (Array.isArray(object)) {
	      object.forEach(function (entry) {
	        math_import(entry, options);
	      });
	    }
	    else if (typeof object === 'object') {
	      // a map with functions
	      for (var name in object) {
	        if (object.hasOwnProperty(name)) {
	          var value = object[name];
	          if (isSupportedType(value)) {
	            _import(name, value, options);
	          }
	          else if (isFactory(object)) {
	            _importFactory(object, options);
	          }
	          else {
	            math_import(value, options);
	          }
	        }
	      }
	    }
	    else {
	      if (!options.silent) {
	        throw new TypeError('Factory, Object, or Array expected');
	      }
	    }
	  }

	  /**
	   * Add a property to the math namespace and create a chain proxy for it.
	   * @param {string} name
	   * @param {*} value
	   * @param {Object} options  See import for a description of the options
	   * @private
	   */
	  function _import(name, value, options) {
	    if (options.wrap && typeof value === 'function') {
	      // create a wrapper around the function
	      value = _wrap(value);
	    }

	    if (isTypedFunction(math[name]) && isTypedFunction(value)) {
	      // merge two typed functions
	      if (options.override) {
	        value = typed(extend({}, math[name].signatures, value.signatures));
	      }
	      else {
	        value = typed(math[name], value);
	      }

	      math[name] = value;
	      _importTransform(name, value);
	      math.emit('import', name, function resolver() {
	        return value;
	      });
	      return;
	    }

	    if (math[name] === undefined || options.override) {
	      math[name] = value;
	      _importTransform(name, value);
	      math.emit('import', name, function resolver() {
	        return value;
	      });
	      return;
	    }

	    if (!options.silent) {
	      throw new Error('Cannot import "' + name + '": already exists');
	    }
	  }

	  function _importTransform (name, value) {
	    if (value && typeof value.transform === 'function') {
	      math.expression.transform[name] = value.transform;
	    }
	  }

	  /**
	   * Create a wrapper a round an function which converts the arguments
	   * to their primitive values (like convert a Matrix to Array)
	   * @param {Function} fn
	   * @return {Function} Returns the wrapped function
	   * @private
	   */
	  function _wrap (fn) {
	    var wrapper = function wrapper () {
	      var args = [];
	      for (var i = 0, len = arguments.length; i < len; i++) {
	        var arg = arguments[i];
	        args[i] = arg && arg.valueOf();
	      }
	      return fn.apply(math, args);
	    };

	    if (fn.transform) {
	      wrapper.transform = fn.transform;
	    }

	    return wrapper;
	  }

	  /**
	   * Import an instance of a factory into math.js
	   * @param {{factory: Function, name: string, path: string, math: boolean}} factory
	   * @param {Object} options  See import for a description of the options
	   * @private
	   */
	  function _importFactory(factory, options) {
	    if (typeof factory.name === 'string') {
	      var name = factory.name;
	      var namespace = factory.path ? traverse(math, factory.path) : math;
	      var existing = namespace.hasOwnProperty(name) ? namespace[name] : undefined;

	      var resolver = function () {
	        var instance = load(factory);

	        if (isTypedFunction(existing) && isTypedFunction(instance)) {
	          // merge two typed functions
	          if (options.override) {
	            instance = typed(extend({}, existing.signatures, instance.signatures));
	          }
	          else {
	            instance = typed(existing, instance);
	          }

	          return instance;
	        }

	        if (existing === undefined || options.override) {
	          return instance;
	        }

	        if (!options.silent) {
	          throw new Error('Cannot import "' + name + '": already exists');
	        }
	      };

	      if (factory.lazy !== false) {
	        lazy(namespace, name, resolver);
	      }
	      else {
	        namespace[name] = resolver();
	      }

	      math.emit('import', name, resolver, factory.path);
	    }
	    else {
	      // unnamed factory.
	      // no lazy loading
	      load(factory);
	    }
	  }

	  /**
	   * Check whether given object is a type which can be imported
	   * @param {Function | number | string | boolean | null | Unit | Complex} object
	   * @return {boolean}
	   * @private
	   */
	  function isSupportedType(object) {
	    return typeof object == 'function'
	        || typeof object === 'number'
	        || typeof object === 'string'
	        || typeof object === 'boolean'
	        || object === null
	        || (object && object.isUnit === true)
	        || (object && object.isComplex === true)
	  }

	  /**
	   * Test whether a given thing is a typed-function
	   * @param {*} fn
	   * @return {boolean} Returns true when `fn` is a typed-function
	   */
	  function isTypedFunction (fn) {
	    return typeof fn === 'function' && typeof fn.signatures === 'object';
	  }

	  return math_import;
	}

	exports.math = true; // request access to the math namespace as 5th argument of the factory function
	exports.name = 'import';
	exports.factory = factory;
	exports.lazy = true;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../utils/object\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	function factory (type, config, load, typed, math) {
	  /**
	   * Set configuration options for math.js, and get current options.
	   * Will emit a 'config' event, with arguments (curr, prev).
	   * @param {Object} [options] Available options:
	   *                            {number} epsilon
	   *                              Minimum relative difference between two
	   *                              compared values, used by all comparison functions.
	   *                            {string} matrix
	   *                              A string 'matrix' (default) or 'array'.
	   *                            {string} number
	   *                              A string 'number' (default) or 'bignumber'
	   *                            {number} precision
	   *                              The number of significant digits for BigNumbers.
	   *                              Not applicable for Numbers.
	   *                            {string} parenthesis
	   *                              How to display parentheses in LaTeX and string
	   *                              output.
	   * @return {Object} Returns the current configuration
	   */
	  return function _config(options) {
	    if (options) {
	      var prev = object.clone(config);

	      // merge options
	      object.deepExtend(config, options);

	      var curr = object.clone(config);

	      // emit 'config' event
	      comb.emit('config', curr, prev);

	      return curr;
	    }
	    else {
	      return object.clone(config);
	    }
	  };
	}

	exports.name = 'config';
	exports.comb = true; // request the comb namespace as fifth argument
	exports.factory = factory;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = [
	  __webpack_require__(7)
	];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = [
	  __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./Permutation\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	];

/***/ }
/******/ ])
});
;