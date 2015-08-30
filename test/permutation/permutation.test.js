'use strict';

var assert = require('assert');
var _ = require('lodash');
var Permutation = require('../../lib/permutation/Permutation');

describe('Permutation type', function () {

  describe('Constructor', function () {

    var permutation;

    it('should create a permutation correctly from the default constructor', function () {
      permutation = new Permutation([]);
      assert.equal(permutation._numCycles, 0);
      assert.equal(_.isArray(permutation._cycles), true);
      assert.equal(_.size(permutation._cycles), 0);
      assert.equal(_.isArray(permutation._values), true);
      assert.equal(_.size(permutation._values), 0);

    });

    it('should throw an error if called with wrong number of arguments', function () {
      assert.throws(function () {
        permutation = new Permutation(3, -4, 5);
      });
      assert.throws(function () {
        permutation = new Permutation(1);
      });
    });

    it('should throw an error if called with wrong type of arguments', function () {
      assert.throws(function () {
        permutation = new Permutation(1, true);
      });
      assert.throws(function () {
        permutation = new Permutation(true, 2);
      });
    });

    it('should throw an error if called without new operator', function () {
      assert.throws(function () {
        permutation = Permutation(3, -4);
      });
    });

    it('should accept an object with an array', function () {
      assert.equal(_.isEqual(new Permutation([1, 2, 3, 4])._cycles, [[1], [2], [3], [4]]), true);
      assert.equal(_.isEqual(new Permutation([1, 2, [3, 4], [5]])._numCycles, 4), true);
      assert.equal(_.isEqual(new Permutation([1, 2, 3, 4])._values, [1, 2, 3, 4]), true);
    });

  });

  describe('isPermutation', function () {

    it('should check if the object is a Permutation', function () {
      assert.equal(new Permutation([]).isPermutation, true);
      assert.equal(new Permutation([1, 2, 3]).isPermutation, true);
      assert.equal(new Permutation([1, 2, 3, 4]).isPermutation, true);
    });

  });

  describe('get', function () {

    it('should retrieve the element at a specific index', function () {
      var perm = new Permutation([1, 2, [3, 4]]);
      assert.equal(perm.get(0), 1);
      assert.equal(_.isEqual(perm.get(2), 3), true);
    });

  });

  describe('disjointCycles', function (){

    it('should correctly return the permutation as disjoint cycles as a string', function (){
      var perm = new Permutation([1, 2, [3, 4]]);
      assert.equal(_.isString(perm.disjointCycles()), true);
      assert.equal(_.isEqual(perm.disjointCycles(), '[[1],[2],[3,4]]'), true);

      perm = new Permutation([1, [2, 3, 4]]);
      assert.equal(_.isString(perm.disjointCycles()), true);
      assert.equal(_.isEqual(perm.disjointCycles(), '[[1],[2,3,4]]'), true);

      perm = new Permutation([1, 2, 3, 4]);
      assert.equal(_.isString(perm.disjointCycles()), true);
      assert.equal(_.isEqual(perm.disjointCycles(), '[[1],[2],[3],[4]]'), true);
      assert.equal(_.isEqual(new Permutation([]).disjointCycles(), '[]'), true);
    });

  });

  describe('inverse', function (){

    it('should correctly calculate the inverse of a permutation', function (){
      var perm = new Permutation([2, 5, 4, 3, 1]);
      assert.equal(_.isEmpty(perm.inverse()), false);
      assert.equal(_.isEqual(perm.inverse()._cycles, [[5], [1], [4], [3], [2]]), true);

      perm = new Permutation([[2, 5, 4], [3, 1]]);
      assert.equal(_.isEmpty(perm.inverse()._cycles), false);
      assert.equal(_.isEqual(perm.inverse()._cycles, [[5], [1], [4], [3], [2]]), true);
    });

  });

  describe('multiply', function (){

    it('should correctly calculate the product of 2 permutation', function (){
      var perm = new Permutation([5, 4, 3, 2, 1]);
      assert.equal(_.isEmpty(perm.inverse()), false);
      assert.equal(_.isEqual(perm.multiply([2, 4, 1, 3, 5])._cycles, [[5], [4], [3], [2], [1]]), true);

      perm = new Permutation([[2, 5, 4], [3, 1]]);
      assert.equal(_.isEmpty(perm.inverse()), false);
      assert.equal(_.isEqual(perm.multiply([2, 4, 1, 3, 5])._cycles, [[2], [5], [4], [3], [1]]), true);
    });

  });

  describe('complement', function () {

    it('should correctly calculate the complement', function () {
      assert.equal(_.isEqual(new Permutation([3, 1, 2]).complement()._values, [1, 3, 2]), true);
      assert.equal(_.isEqual(new Permutation([3, 4, 1, 5, 2]).complement()._values, [3, 2, 5, 1, 4]), true);
    });

    it('should return empty complement when permutation values is empty', function () {
      assert.equal(_.isEqual(new Permutation([]).complement()._values, []), true);
    });

  });

  describe('reverse', function () {

      it('should calculate reverse of a permutation', function () {
          var perm = new Permutation([1, 2, 3]);
          assert.equal(_.isEqual(perm.reverse()._values, [3, 2, 1]), true);

          perm = new Permutation([1, 2, 3, 4]);
          assert.equal(_.isEqual(perm.reverse()._values, [4, 3, 2, 1]), true);
      });

  });

  describe('isIdentity', function () {
    it('should determine if current permutation is identity', function () {
      var perm = new Permutation([1, 2, 3, 4, 5]);
      var perm2 = new Permutation([1, 2, 3, 4, 5]);
      assert.equal(_.isEqual(perm._values, perm2._values), true);
      perm2 = new Permutation([5, 4, 3, 2, 1]);
      assert.equal(_.isEqual(perm._values, perm2._values), false);
    });

  });

  describe('randomize', function () {
    it('should shuffle the values', function () {
      var perm = new Permutation([1, 2, 3, 4, 5]);
      var perm2 = new Permutation([1, 2, 3, 4, 5]);
      assert.equal(_.isEqual(perm.randomize()._values, perm2._values), false);
      perm = new Permutation([5, 4, 3, 2, 1]);
      assert.equal(_.isEqual(perm.randomize()._values, perm2._values), false);
    });

  });

});
