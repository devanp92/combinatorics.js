var assert = require('assert');
var comb = require('../../../index');
var Permutation = comb.type.Permutation;

describe('permutation', function() {

  describe('constructor', function() {

    it('should create a permutation', function(){
      var p = new Permutation();
      assert(p instanceof Permutation);
    });
  });
});