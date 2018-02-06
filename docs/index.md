## Background !heading

Say you have many somewhat similar types, sharing part of their APIs. For example they can be 'added', for whatever it means. Sometimes the operation is costly, sometimes not, but often the result is obvious, like adding a 'null' type, but still many computation are done. Testing on types would defeat the polymorphism, so you end up wasting ressources.

`typed-method` allows to define eponymous methods on the same object like in strongly types languages, one per 'added' type, so that you can customize all operations on a type by type basis without testing on actual types. It does though add a systematic overhead on each call (it requires two implicit redirections), so it's only useful if the generic implementation is wasteful.

## Usage !heading

`typed-method` provides a `method` factory that generates custom functions for you to extend your types. It has two arguments, the name of the methods you want to extend your types with, and an options object to specify some properties for the methods or to create alongside related methods (like negated ones or reciprocal ones).

Once you have created a custom function, you can use it to extend your types like in the following example.

#include "build/docs/examples/usage.test.md"

### Options !heading

* `equal`: Boolean. Ensures equality between instances of different types is always false.
* `unequal`: Boolean. Ensures inequality between instances of different types is always true.
* `symmetric`: Boolean. When an implementation is defined for a pair of different types, automatically defines it for the permuted pair. Not to be confused with the more optimized `commutative` option, which doesn't add more overhead.
* `commutative`: Boolean. Differs from the `symmetric` option in that it indicates that the implementation treats `this` (caller) and `arg` (callee) symmetrically, allowing to use it also for the permuted caller/callee pair, thus reducing overhead.
* `reciprocal`: String. Gives a different name to the method when the pair caller/callee is permuted (like in `greater/lower` or `includes/isIncluded`).
* `negate`: String. Gives a name to the negated method (like in `greater/lowerOrEqual` or `includes/isStrictlyIncluded`).
* `strict`: String. Must be used in conjunction with `condition` option. Helps define a stricter version of the method (like in `greaterOrEqual/greater` or `includes/includesStrictly`).
* `loose`: String. Must be used in conjunction with `condition` option. Helps define a looser version of the method (like in `greater/greaterOrEqual` or `includesStrictly/includes`).
* `condition`: String. Used in combination with `strict` or `loose` options. Specifies the marginal method with which the method can be rendered stricter or looser
* `strictReciprocal`: String. Must be used in conjunction with `strict` option. Helps define a stricter version of the reciprocal method (like in `greaterOrEqual/lower` or `includes/isIncludedStrictly`).
* `looseReciprocal`: String. Must be used in conjunction with `loose` option. Helps define a stricter version of the reciprocal method (like in `greater/lowerOrEqual` or `includesStrictly/isIncluded`).

## Special implementations !heading

When dealing with methods returning booleans, sometimes their truth is known in advance, making any computations useless/wasteful. Two special implementations are provided so as to specify certain results, namely `succeed` and `fail`.

Reciprocal, negated, conditional methods recognize them and are optimized accordingly.

## License !heading

typed-method is [MIT licensed](./LICENSE).

© 2018 [Jason Lenoble](mailto:jason.lenoble@gmail.com)
