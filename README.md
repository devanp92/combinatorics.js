# Combinatorics.js

# Table of Contents

1. [Introduction](#introduction)
2. [Install/Build](#installbuild)
2. [Roadmap](#roadmap)
3. [Contributing](#contributing)
4. [License] (#license)

# Introduction

Combinatorics.js is a standalone math library for Javascript and Node.js. It features a solution to work with Permutations, Posets, Trees, and other enumerative collections.

Combinatorics.js is also a module to [math.js](https://github.com/josdejong/mathjs).

Please see [this blog article](http://www.devanpatel.me/writing-a-combinatorics-module-for-math-js/) to get a general feel for this project.

# Install/Build

To clone this project:
```
git clone git@github.com:devanp92/combinatorics.js.git
cd combinatorics.js
```

To install the necessary dependencies:
```
npm install
```

To test we use Mocha:

```
npm test // mocha test --recursive
```

To build we use Gulp:

```
gulp
```

# Roadmap

A rough roadmap for Combinatorics.js

Permutation: π : {1...m} -> {1...m}:

* Behaviors
  * <s>Inverse</s>
  * <s>Multiply</s>
  * <s>Calculate number of cycles</s>
  * <s>Complement</s>
  * <s>Reverse</s>
  * <s>Randomize Permutation</s>
* States
  * <s>Number of cycles</s>
  * <s>Parity (odd/even)</s>
  * Number of fixed points (is it a Derangement?)
  * <s>Is Identity</s>
* Ancillary
  * Create/Return iterator
  * <s>Print to cycle notation</s>

Util Functions

* <s>Is Integer</s>
* <s>Combinations</s>
* Enumerative Methods
  * Bell Numbers
  * Stirling numbers of the first kind
  * Partitions
    * (Weak) Compositions
    * Set Partitions
      * Stirling numbers of the second kind
    * Integer Paritions

# Contributing

Feel free to contribute to combinatorics.js! You can contribute in different ways: spread the word, report bugs, come up with ideas and suggestions, and contribute to the code.

There are a few preferences regarding code contributions:

    Combinatorics.js follows the node.js code style
    Send pull requests to the develop branch, not the master branch.
    Pleae do not commit any files other than in lib/ and test/.
    If adding functionality, please include source (lib/) and test (test/) files.



Thanks!

_Adapted from math.js_

License

Copyright (C) 2015 Devan Patel devanppatel92@gmail.com

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
