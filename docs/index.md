## Background !heading

Say you have many somewhat similar types, sharing part of their APIs. For example they can be 'added', for whatever it means. Sometimes the operation is costly, sometimes not, but often the result is obvious, like adding a 'null' type, but still many computation are done. Testing on types would defeat the polymorphism, so you end up wasting ressources.

`typed-method` allows to define eponymous methods on the same object like in strongly types languages, one per 'added' type, so that you can customize all operations on a type by type basis without testing on actual types. It does though add a systematic overhead on each call (it requires two implicit redirections), so it's only useful if the generic implementation is wasteful.

## Usage !heading

`typed-method` provides a `method` factory that generates custom functions for you to extend your types. It has two arguments, the name of the methods you want to extend your types with, and an options object to specify some properties for the methods or to create alongside related methods (like negated ones or reciprocal ones).

Once you have created a custom function, you can use it to extend your types like in the following example.

#include "build/docs/examples/usage.test.md"

### Options !heading




## License !heading

typed-method is [MIT licensed](./LICENSE).

© 2018 [Jason Lenoble](mailto:jason.lenoble@gmail.com)
