import Implementation from './implementation';
import {succeed, fail} from './functions';
import {getSpreadArgs} from '../input';

export function optimize (implementation) {
  switch (implementation) {
  case succeed:
    return fail;

  case fail:
    return succeed;

  default:
    // Do nothing
  }
}

export default class NegateImplementation extends Implementation {
  constructor (name, implementation, callerType, calleeTypes) {
    const args = getSpreadArgs(name, callerType, calleeTypes);

    super('negate:' + args._method, calleeTypes.length === 1
      ? function (obj) {
        return !this[name](obj); // eslint-disable-line no-invalid-this
      }
      : function (...args) {
        return !this[name](...args); // eslint-disable-line no-invalid-this
      }
    );

    Object.defineProperty(this, 'optimized', {
      value: optimize(implementation) || this.implementation,
      enumerable: true,
    });
  }
}
