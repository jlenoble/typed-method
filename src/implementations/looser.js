import Implementation from './implementation';
import {succeed, fail} from './functions';
import {getSpreadArgs} from '../input';

export function optimize (implementation, conditionImplementation) {
  if (conditionImplementation === fail) {
    return implementation;
  }

  if (conditionImplementation === succeed) {
    return succeed;
  }

  if (implementation === succeed) {
    return succeed;
  }
}

export default class LooserImplementation extends Implementation {
  constructor (
    name,
    implementation,
    conditionImplementation,
    callerType,
    calleeTypes
  ) {
    const args = getSpreadArgs(name, callerType, calleeTypes);

    super('looser:' + args._method, calleeTypes.length === 1
      ? function (obj) {
        // eslint-disable-next-line no-invalid-this
        return conditionImplementation.call(this, obj)
          // eslint-disable-next-line no-invalid-this
          || implementation.call(this, obj);
      }
      : function (...args) {
        // eslint-disable-next-line no-invalid-this
        return conditionImplementation.apply(this, args)
          // eslint-disable-next-line no-invalid-this
          || implementation.apply(this, args);
      }
    );

    Object.defineProperty(this, 'optimized', {
      value: optimize(implementation, conditionImplementation) ||
        this.implementation,
      enumerable: true,
    });
  }
}
