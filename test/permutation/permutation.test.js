'use strict';

var assert = require('assert');
var _ = require('lodash');
var Permutation = require('../../index');

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
});