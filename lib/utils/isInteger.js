'use strict';

/**
 * Validates if the value inputted is an integer
 * @param {Integer} integer to validate
 * @return {Boolean} true if integer, false otherwise
 */

exports.isInteger = function (value) {
    var x;
    return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
}
