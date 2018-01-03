import Implementation from './implementation';
import {succeed, fail} from './functions';
import {getSpreadArgs} from '../input';

export function optimize (implementation, conditionImplementation) {
  if (conditionImplementation === fail) {
    return fail;
  }

  if (conditionImplementation === succeed) {
    return implementation;
  }

  if (implementation === fail) {
    return fail;
  }
}

export default class StricterImplementation extends Implementation {
  constructor (
    name,
    implementation,
    conditionImplementation,
    callerType,
    calleeTypes
  ) {
    const args = getSpreadArgs(name, callerType, calleeTypes);

    super('stricter:' + args._method, calleeTypes.length === 1
      ? function (obj) {
        // eslint-disable-next-line no-invalid-this
        return conditionImplementation.call(this, obj)
          // eslint-disable-next-line no-invalid-this
          ? implementation.call(this, obj)
          : false;
      }
      : function (...args) {
        // eslint-disable-next-line no-invalid-this
        return conditionImplementation.apply(this, args)
          // eslint-disable-next-line no-invalid-this
          ? implementation.apply(this, args)
          : false;
      }
    );

    Object.defineProperty(this, 'optimized', {
      value: optimize(implementation, conditionImplementation) ||
        this.implementation,
      enumerable: true,
    });
  }
}
