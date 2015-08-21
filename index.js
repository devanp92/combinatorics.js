var core = require('./core');

/**
 * combinatorics.js factory function. Creates a new instance of combinatorics.js
 */
function create (config) {
  // create a new comb.js instance
  var comb = core.create(config);
  comb.create = create;

  // import data types, functions, constants, expression parser, etc.
  comb.import(require('./lib'));

  return comb;
}

// return a new instance of comb.js
module.exports = create();