import Implementation from './implementation';
import {succeed, fail} from './functions';

export function optimize (implementation) {
  switch (implementation) {
  case succeed: case fail:
    return implementation;

  default:
    // Do nothing
  }
}

export default class ReciprocalImplementation extends Implementation {
  constructor (name, implementation) {
    super(name + ':reciprocal', function (obj) {
      return obj[name](this); // eslint-disable-line no-invalid-this
    });

    Object.defineProperty(this, 'optimized', {
      value: optimize(implementation) || this.implementation,
      enumerable: true,
    });
  }
}
