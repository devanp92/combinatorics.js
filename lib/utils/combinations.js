'use strict';

var _ = require('lodash');
var isInteger = require('./isInteger').isInteger;

   /**
   * Compute the number of ways of picking `k` unordered outcomes from `n`
   * possibilities.
   *
   * Combinations only takes integer arguments.
   * The following condition must be enforced: k <= n.
   *
   * Syntax:
   *
   *     utils.combinations(n, k)
   *
   * Examples:
   *
   *    utils.combinations(7, 5); // returns 21
   *
   * @param {Integer} n    Total number of objects in the set
   * @param {Integer} k    Number of objects in the subset
   * @return {Integer}     Number of possible combinations.
   */

exports.combinations = function (n, k) {
    if(!_.isNumber(n) || !_.isNumber(k) || !isInteger(n) || !isInteger(k)) {
      throw new TypeError('Inputs must be of positive integer type');
    } else if (k > n) {
      throw new RangeError('n must be greater than or equal to k');
    } else if(n < 0 || k < 0) {
      throw new RangeError('Inputs must be positive');
    } else {
      var result = 1;
      var max = _.max([k, n - k]);
      _.forEach(_.range(1, n - max + 1), function (i) {
        result *= (max + i) / i;
      });
      return result;
    }
}
