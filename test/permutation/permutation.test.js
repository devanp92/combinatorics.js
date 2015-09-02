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
      assert.equal(Array.isArray(permutation._cycles), true);
      assert.equal(permutation._cycles.length, 0);
      assert.equal(Array.isArray(permutation._values), true);
      assert.equal(permutation._values.length, 0);

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
      assert.deepEqual(new Permutation([1, 2, 3, 4])._cycles, [[1], [2], [3], [4]]);
      assert.equal(new Permutation([1, 2, [3, 4], [5]])._numCycles, 4);
      assert.deepEqual(new Permutation([1, 2, 3, 4])._values, [1, 2, 3, 4]);
    });

    it('should determine number of fixed points given array', function () {
      assert.equal(new Permutation([1, 2, 3, 4])._numFixedPoints,4); 
      assert.equal(new Permutation([1, 2, 5, 4, 3])._numFixedPoints, 3);
      assert.equal(new Permutation([5, 4, 3, 2, 1])._numFixedPoints, 1);
      assert.equal(new Permutation([1, [2, 3, 5], 4])._numFixedPoints, 3);
    });

    it.skip('should create the correct cycles when instantiated with array', function () {
      var perm = new Permutation([2, 1, 5, 4, 3]);
      console.log('perm._cycles', perm._cycles);
      assert.equal(_.isEqual(new Permutation([2, 1, 5, 4, 3])._cycles, [ [1, 2], [3, 4, 5] ]), true);
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
      assert.equal(perm.get(2), 3);
    });

  });

  describe('disjointCycles', function (){

    it('should correctly return the permutation as disjoint cycles as a string', function (){
      var perm = new Permutation([1, 2, [3, 4]]);
      assert.equal(_.isString(perm.disjointCycles()), true);
      assert.equal(perm.disjointCycles(), '[[1],[2],[3,4]]');

      perm = new Permutation([1, [2, 3, 4]]);
      assert.equal(_.isString(perm.disjointCycles()), true);
      assert.equal(perm.disjointCycles(), '[[1],[2,3,4]]');

      perm = new Permutation([1, 2, 3, 4]);
      assert.equal(_.isString(perm.disjointCycles()), true);
      assert.equal(perm.disjointCycles(), '[[1],[2],[3],[4]]');
      assert.equal(new Permutation([]).disjointCycles(), '[]');
    });

  });

  describe('inverse', function (){

    it('should correctly calculate the inverse of a permutation', function (){
      var perm = new Permutation([2, 5, 4, 3, 1]);
      assert.equal(perm.inverse()._values.length, 5);
      assert.deepEqual(perm.inverse()._cycles, [ [ 5 ], [ 1 ], [ 4 ], [ 3 ], [ 2 ] ]);

      perm = new Permutation([[2, 5, 4], [3, 1]]);
      assert.equal(perm.inverse()._cycles.length, 5);
      assert.deepEqual(perm.inverse()._cycles, [[5], [1], [4], [3], [2]]);
    });

  });

  describe('multiply', function (){

    it('should correctly calculate the product of 2 permutation', function (){
      var perm = new Permutation([5, 4, 3, 2, 1]);
      assert.equal(perm.inverse()._values.length, 5);
      assert.deepEqual(perm.multiply([2, 4, 1, 3, 5])._cycles, [[5], [4], [3], [2], [1]]);

      perm = new Permutation([[2, 5, 4], [3, 1]]);
      assert.equal(perm.inverse()._values.length, 5);
      assert.deepEqual(perm.multiply([2, 4, 1, 3, 5])._cycles, [[2], [5], [4], [3], [1]]);
    });

  });

  describe('complement', function () {

    it('should correctly calculate the complement', function () {
      assert.deepEqual(new Permutation([3, 1, 2]).complement()._values, [1, 3, 2]);
      assert.deepEqual(new Permutation([3, 4, 1, 5, 2]).complement()._values, [3, 2, 5, 1, 4]);
    });

    it('should return empty complement when permutation values is empty', function () {
      assert.deepEqual(new Permutation([]).complement()._values, []);
    });

  });

  describe('reverse', function () {

      it('should calculate reverse of a permutation', function () {
          var perm = new Permutation([1, 2, 3]);
          assert.deepEqual(perm.reverse()._values, [3, 2, 1]);

          perm = new Permutation([1, 2, 3, 4]);
          assert.deepEqual(perm.reverse()._values, [4, 3, 2, 1]);
      });

  });

  describe('isIdentity', function () {
    it('should determine if current permutation is identity', function () {
      var perm = new Permutation([1, 2, 3, 4, 5]);
      var perm2 = new Permutation([1, 2, 3, 4, 5]);
      assert.deepEqual(perm._values, perm2._values);
      perm2 = new Permutation([5, 4, 3, 2, 1]);
      assert.notDeepEqual(perm._values, perm2._values);
    });

  });

  describe('randomize', function () {
    it('should shuffle the values', function () {
      var perm = new Permutation([1, 2, 3, 4, 5]);
      var perm2 = new Permutation([1, 2, 3, 4, 5]);
      assert.notDeepEqual(perm.randomize()._values, perm2._values);
      perm = new Permutation([5, 4, 3, 2, 1]);
      assert.notDeepEqual(perm.randomize()._values, perm2._values);
    });

  });

});
