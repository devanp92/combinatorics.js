'use strict'

function factory (type, config, load, typed) {
  /**
   * Permutation is contains one or more arrays
   * @param {Array} permutation n dimensional array, where each dimension represents a cycle
   */
  function Permutation (permutation) {
    if (!(this instanceof Permutation)) {
      throw new SyntaxError('Permutation constructor must be called with the new operator');
    }

    this.cycles = cycles || [];
  }
 /**
   * Attach type information
   */
  Permutation.prototype.type = 'Permutation';
}