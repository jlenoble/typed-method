# typed-method

Strongly typed method factories

  * [Background](#background)
  * [Usage](#usage)
    * [Options](#options)
  * [Special implementations](#special-implementations)
  * [License](#license)


## Background

Say you have many somewhat similar types, sharing part of their APIs. For example they can be 'added', for whatever it means. Sometimes the operation is costly, sometimes not, but often the result is obvious, like adding a 'null' type, but still many computation are done. Testing on types would defeat the polymorphism, so you end up wasting ressources.

`typed-method` allows to define eponymous methods on the same object like in strongly types languages, one per 'added' type, so that you can customize all operations on a type by type basis without testing on actual types. It does though add a systematic overhead on each call (it requires two implicit redirections), so it's only useful if the generic implementation is wasteful.

## Usage

`typed-method` provides a `method` factory that generates custom functions for you to extend your types. It has two arguments, the name of the methods you want to extend your types with, and an options object to specify some properties for the methods or to create alongside related methods (like negated ones or reciprocal ones).

Once you have created a custom function, you can use it to extend your types like in the following example.

```js
import method from 'typed-method';

const equal = method('equal', {negate: 'unequal', commutative: true});
const greater = method('greater', {
  reciprocal: 'lower',
  negate: 'lowerOrEqual',
  loose: 'greaterOrEqual',
  condition: 'equal',
});

class Num {
  constructor (n) {
    this.n = n;
  }
}

equal(function (obj) {
  return this.n === obj.n;
}, Num);

greater(function (obj) {
  return this.n > obj.n;
}, Num);

const one = new Num(1);
const two = new Num(2);

one.equal(two); // false;
one.equal(one); // true;

one.greater(two); // false;
two.greater(one); // true;

one.lower(two); // true;
two.lower(one); // false;

one.lowerOrEqual(two); // true;
two.lowerOrEqual(one); // false;
one.lowerOrEqual(one); // true;

one.greaterOrEqual(two); // false;
two.greaterOrEqual(one); // true;
one.greaterOrEqual(one); // true;
```

### Options

* `equal`: Boolean. Ensures equality between instances of different types is always false.
* `unequal`: Boolean. Ensures inequality between instances of different types is always true.
* `symmetric`: Boolean. When an implementation is defined for a pair of different types, automatically defines it for the permuted pair. Not to be confused with the more optimized `commutative` option, which doesn't add more overhead.
* `commutative`: Boolean. Differs from the `symmetric` option in that it indicates that the implementation treats `this` (caller) and `arg` (callee) symmetrically, allowing to use it also for the permuted caller/callee pair, thus reducing overhead.
* `reciprocal`: String. Gives a different name to the method when the pair caller/callee is permuted (like in `greater/lower` or `includes/isIncluded`).
* `negate`: String. Gives a name to the negated method (like in `greater/lowerOrEqual` or `includes/isStrictlyIncluded`).
* `strict`: String. Must be used in conjunction with `condition` option. Helps define a stricter version of the method (like in `greaterOrEqual/greater` or `includes/includesStrictly`).
* `loose`: String. Must be used in conjunction with `condition` option. Helps define a looser version of the method (like in `greater/greaterOrEqual` or `includesStrictly/includes`).
* `condition`: String. Used in combination with `strict` or `loose` options. Specifies the marginal method with which the method can be rendered stricter or looser

## Special implementations

When dealing with methods returning booleans, sometimes their truth is known in advance, making any computations useless/wasteful. Two special implementations are provided so as to specify certain results, namely `succeed` and `fail`.

Reciprocal, negated, conditional methods recognize them and are optimized accordingly.

## License

typed-method is [MIT licensed](./LICENSE).

© 2018 [Jason Lenoble](mailto:jason.lenoble@gmail.com)
