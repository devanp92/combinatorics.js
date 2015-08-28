'use strict';

var assert = require('assert');
var isInteger = require('../../lib/utils/isInteger').isInteger;

describe('isInteger', function () {

  it('should validate if the input is an integer', function () {
    assert.equal(isInteger(1), true);
    assert.equal(isInteger(0.2), false);
    assert.equal(isInteger('string'), false);
    assert.equal(isInteger([]), false);
    assert.equal(isInteger({}), false);
  });

});