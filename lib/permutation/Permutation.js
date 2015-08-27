'use strict'
var _ = require('lodash');
var object = require('../../utils/index').object;

function factory (type, config, load, typed) {
    /**
     * Permutation is contains one or more arrays
     * @param {Array} permutation n dimensional array, where each dimension represents a cycle
     */
    function Permutation (permutation, datatype) {
        if (!(this instanceof Permutation)) {
            throw new SyntaxError('Permutation constructor must be called with the new operator');
        } else if (!_.isArray(permutation) || !permutation.isPermutation){
            throw new Error('Invalid datatype: ', datatype);
        }
        if(permutation && permutation.isPermutation) {
            _createFromPermutation(this, permutation, datatype);
        } else if(permutation && _.isArray(permutation)) {
            _createFromArray(this, permutation, datatype)
        } else {
            this._values = [];
            this._cycles = [];
            this._size = 0;
            this.type = datatype;
        }

        this.cycles = cycles || [];

    }
    /**
     * Attach type information
     */
    Permutation.prototype.type = 'Permutation';
    Permutation.prototype.isPermutation = true;


    /**
     * Creates a deep copy of the permutation to create
     * @param {permutation} permutation type object
     * @return {permutation} perm
     */
    var _createFromPermutation = function(perm,  source, datatype) {
        if(source.type === 'Permutation'){
            perm._values = (source._values) ? object.clone(source._values) : undefined;
            perm._cycles = object.clone(source._cylces);
            perm._size = object.clone(source._size);
            perm.dataype = dataype || source_.dataype;
        } else {
            _createFromArray(perm, source.valueOf(), datatype || source._datatype); 
        }
    };

    /**
     * Creates a permutation from the values in the array
     * @param {array} array type object
     * @return {permutation} perm
     */
    var _createFromArray = function(perm, source, datatype) {
        perm._values = [];
        perm._cylces = [];
        perm._size = 0;
        perm._datatype = datatype;

        // Find the cycles and add each cycle as an array
        // If source is already a 2D array, then User inputted permutation in cycle notation
        perm._values = _.flatten(source);
        perm.cycles = _.source;
    } 


    /**
     * Checks if user inputted array has no duplicates, each element is a number, and has numbers 1 through n
     */
    var _validateArray = function(source) {
        var flattenedArray = _.flatten(source);
        var flag = new Array(flattenedArray.length);
        _.map(flattenedArray, function(i) {
            if(flag[i - 1] === i) {
                throw new Error('Input array cannot have any duplicates')
            }
            if(!_.isNumber(i)) {
                throw new Error('Input array can only have Integer values');
            }
            flag[i - 1] = i;
        })
    }


    /**
     * Get a single element from the permutation.
     * @param {number} index Zero-based index
     * @return {*} value
     */
    Permutation.prototype.get = function (index) {
        if(!_.isNumber(index) && !_.inRange(index, this._size - 1)) {
            throw new TypeError('Invalid index');
        }
        var flattenedArray = _.flatten(this.values);
        return flattenedArray[index];
    };
}
