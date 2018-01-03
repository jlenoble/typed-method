import {succeed, fail} from './implementations/functions';

const _methods = new Map();

// ***************************************************************
// Negate
// ***************************************************************
export function negate (name, nCallees) {
  const _method = name + `:negate(${nCallees})`;
  let negateImplementation = _methods.get(_method);

  if (!negateImplementation) {
    negateImplementation = nCallees === 1
      ? function (obj) {
        return !this[name](obj); // eslint-disable-line no-invalid-this
      }
      : function (...args) {
        return !this[name](...args); // eslint-disable-line no-invalid-this
      };

    _methods.set(_method, negateImplementation);
  }

  return negateImplementation;
}

export function optimizedNegate (name, implementation, nCallees) {
  switch (implementation) {
  case succeed:
    return fail;

  case fail:
    return succeed;

  default:
    return negate(name, nCallees);
  }
}

export {succeed, fail};
