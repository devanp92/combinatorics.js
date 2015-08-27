var isFactory = require('./../../utils/object').isFactory;
var deepExtend = require('./../../utils/object').deepExtend;
var typedFactory = require('./typed');
var emitter = require('./../../utils/emitter');

var importFactory = require('./import');
var configFactory = require('./config');

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
