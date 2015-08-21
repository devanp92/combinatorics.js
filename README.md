# Combinatorics.js

# Table of Contents

1. [Introduction](#introduction)
2. [Roadmap](#roadmap)
3. [Contributing](#contributing)

# Introduction

Combinatorics.js is a standalone math library for Javascript and Node.js. It features a solution to work with Permutations, Posets, Trees, and other enumerative collections.

Combinatorics.js is also a module to [math.js](https://github.com/josdejong/mathjs).

Please see [this blog article](http://www.devanpatel.me/writing-a-combinatorics-module-for-math-js/) to get a general feel for this project.

# Roadmap

A rough roadmap for Combinatorics.js

Permutation: π : {1...m} -> {1...m}

* Permutations
  * Behaviors
    * Inverse
    * Multiply
    * Calculate number of cycles
    * Complement
    * Inverse
    * Reverse
    * Generate Random Permutation
  * States
    * Number of cycles
    * Parity (odd/even)
    * Number of fixed points (is it a Derangement?)
    * Is Identity
  * Ancillary
    * Create/Return iterator
    * Print to cycle notation

# Contributing

Feel free to contribute to combinatorics.js! You can contribute in different ways: spread the word, report bugs, come up with ideas and suggestions, and contribute to the code.

There are a few preferences regarding code contributions:

    Combinatorics.js follows the node.js code style as described here.
    Send pull requests to the develop branch, not the master branch.
    Only commit changes done in the source files under lib, not to the builds which are located in the folder dist.

Thanks!

_Adapted from math.js_
