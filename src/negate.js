import Method from './method';
import Binary from './binary';

const _methods = new Map();

function getNegateImplementation (name, implementation, nCallees) {
  const _method = name + `(${nCallees})`;
  let negateImplementation = _methods.get(_method);

  if (!negateImplementation) {
    switch (implementation) {
    case Negate.succeed:
      negateImplementation = Negate.fail;
      break;

    case Negate.fail:
      negateImplementation = Negate.succeed;
      break;

    default:
      negateImplementation = nCallees === 1 ? function (obj) {
        return !this[name](obj); // eslint-disable-line no-invalid-this
      } : function (...args) {
        return !this[name](...args); // eslint-disable-line no-invalid-this
      };
    }

    _methods.set(_method, negateImplementation);
  }

  return negateImplementation;
}

export default class Negate {
  constructor (name, negateName, implementation, callerType, ...calleeTypes) {
    const negateImplementation = getNegateImplementation(name, implementation,
      calleeTypes.length);

    if (calleeTypes.length === 1) {
      const calleeType = calleeTypes[0];

      new Binary(name, implementation, callerType, calleeType);
      new Binary(negateName, negateImplementation, callerType, calleeType);
    } else {
      new Method(name, implementation, callerType, ...calleeTypes);
      new Method(negateName, negateImplementation, callerType, ...calleeTypes);
    }
  }
}

Negate.succeed = function () {
  return true;
};

Negate.fail = function () {
  return false;
};
