'use strict';
var _ = require('lodash');
var object = require('../../lib/utils/object');

  /**
  * Permutation is contains one or more arrays
  * @param {Array} permutation n dimensional array, where each dimension represents a cycle
  */

function Permutation(permutation) {
  if (!(this instanceof Permutation)) {
    throw new SyntaxError('Permutation constructor must be called with the new operator');
  } else if (!_.isArray(permutation) && !permutation.isPermutation){
    throw new TypeError('Invalid type in constructor');
  } else if (_.isUndefined(permutation)) {
    throw new TypeError('Input must be not be undefined');
  } else if (permutation.isPermutation) {
    _createFromPermutation(this, permutation);
  } else if (_.isArray(permutation)) {
    _createFromArray(this, permutation);
  } else {
    this._values = [];
    this._cycles = [];
    this._numCycles = 0;
    this._size = 0;
  }
}

   /**
   * Creates a deep copy of the permutation to create
   * @param {permutation} permutation type object
   * @return {permutation} perm
   */

var _createFromPermutation = function (perm, source) {
  _validateArray(source._values);
  perm._values = (source._values) ? object.clone(source._values) : undefined;
  perm._cycles = object.clone(source._cycles);
  perm._numCycles = object.clone(source._numCycles);
  perm._size = object.clone(source._size);
};

   /**
   * Creates a permutation from the values in the array
   * @param {array} array type object
   * @return {permutation} perm
   */

var _createFromArray = function (perm, source) {
  var numCycles = 0;
  var isNewArray = [];
  var cycles = [];
  _validateArray(source);
  if (_.size(source) > 0) {
    source.forEach(function (cycle) {
      if (_.isArray(cycle) && isNewArray !== cycle) {
        numCycles++;
        isNewArray = cycle;
        cycles.push(cycle);
      } else if (_.isNumber(cycle)) {
        numCycles++;
        isNewArray = [];
        cycles.push([cycle]);
      }
    });
    perm._numCycles = numCycles;
    perm._cycles = cycles;
    perm._size = _.size(perm._values);
    perm._values = _.flatten(source);
  } else {
    perm._cycles = [];
    perm._numCycles = 0;
    perm._values = [];
    perm._size = 0;
  }
};

  /**
   * Checks if user inputted array has no duplicates, each element is a number, and has numbers 1 through n
   */

var _validateArray = function (source) {
  var flattenedArray = _.flatten(source);
  if (!_.isEqual(_.uniq(flattenedArray), flattenedArray)){
    throw new TypeError('Permutation must contain unique integers from 1 to n.');
  }
  _.forEach(flattenedArray, function (i) {
    if (!_.isNumber(i)) {
      throw new Error('Input array can only have Integer values from 1 to n');
    }
  });
};


   /**
   * Attach type information
   */

Permutation.prototype.type = 'Permutation';
Permutation.prototype.isPermutation = true;

   /**
   * A permutation is ODD if the permutation's product of disjoint cycles has an odd number of cycles of even length
   */

Permutation.prototype.parity = function () {
   var lengthOfDisjointCycles = _.size(this._cycles);
   var areAllCyclesOddLength = _.every(this._cycles, function (i) {
       return (_.size(i) % 2 === 1);
   });
   this._parity = (lengthOfDisjointCycles % 2 === 1 && areAllCyclesOddLength) ? "ODD" : "EVEN";
}

  /**
   * Get a single element from the permutation.
   * @param {number} index Zero-based index
   * @return {*} value
   */

Permutation.prototype.get = function (index) {
  if (!_.isNumber(index) && !_.inRange(index, this._size - 1)) {
    throw new TypeError('Invalid index');
  }
  var flattenedArray = _.flatten(this._values);
  return flattenedArray[index];
};

  /**
  * disjointCycles
  * Returns the permutation as disjoint cycles in a string format
  * @returns {String} Returns the disjoint cycles in a stringified version
  */

Permutation.prototype.disjointCycles = function () {
  return JSON.stringify(this._cycles);
};

  /*
  * inverse
  * Caclulates and returns the inverse of the permutation as the second row in the 2-line notation form.
  * @returns {Permutation} product of this and multiplicand
  */

Permutation.prototype.inverse = function () {
  var inverseArray = [];
  if (!_.isEmpty(this._values)) {
    for (var i = 0; i < _.size(this._values); i++) {
      inverseArray.push(_.indexOf(this._values, i + 1) + 1);
    }
  }
  return new Permutation(inverseArray);
};

  /*
  * multiply
  * Calculates the product of this permutation and a multiplicand
  * @params {Permutation | Array} Permutation or Array as multiplicand
  * @returns {Permutation} product of this and multiplicand
  */

Permutation.prototype.multiply = function (multiplicand) {
  if (_.isUndefined(multiplicand) || (!multiplicand.isPermutation && !_.isArray(multiplicand))) {
    throw new Error('Argument must be of type Permutation of array');
  }
  var product = [];
  if (!_.isEmpty(this._values)) {
    if (!_.isEmpty(multiplicand._values)) {
      for (var i = 0; i < _.size(multiplicand._values); i++) {
        product.push(_.indexOf(this._values, multiplicand._values[i + 1]) + 1);
      }
      return new Permutation(product);
    } else {
      return new Permutation(this._values);
    }
  } else {
    return new Permutation(multiplicand._values);
  }
};

/*
 * complement
 * Computes the complement of this permutation
 * @return {Permutation} complement
 */

Permutation.prototype.complement = function () {
  var complement = new Array(_.size(this._values));
  for (var i = 0; i < _.size(this._values); i++) {
    complement[i] = _.size(this._values) + 1 - this._values[i]
  };
  return new Permutation(complement);
};

/*
 * reverse
 * Calculates the reverse of the permutation
 * @return {Permutation}
 */

Permutation.prototype.reverse = function () {
    return new Permutation(this._values.reverse());
}

module.exports = Permutation;
