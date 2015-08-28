'use strict';

var assert = require('assert');
var combinations = require('../../lib/utils/combinations').combinations;

describe('Combinations', function () {

  it('calculate the combinations of two integers', function () {
    assert.equal(combinations(1, 1), 1);
    assert.equal(combinations(7, 5), 21);
    assert.equal(combinations(20, 15), 15504);
    assert.equal(combinations(63, 7), 553270671);
    assert.equal(combinations(25, 6), 177100);
    assert.equal(combinations(250, 6), 319195444750);
  });

  it('throw exception for incorrect positive integer values for n and k', function () {
    assert.throws(function () {
        combinations(0, 1);
    });
    assert.throws(function () {
        combinations(-1, 9);
    });
    assert.throws(function () {
        combinations(5, 10);
    });
  });

  it('throw exception for non integer input values', function () {
    assert.throws(function () {
        combinations('1', 1);
    });
    assert.throws(function () {
        combinations([], []);
    });
    assert.throws(function () {
        combinations(1, '0');
    });
    assert.throws(function () {
        combinations(1, 0.4);
    });
  });

});