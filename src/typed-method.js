import {
  Binary,
  Commute,
  Equal,
  Looser,
  Method,
  Negate,
  Reciprocal,
  Stricter,
  Symmetric,
  Unequal,
} from './methods';

export default function method (name, {
  equal, unequal, symmetric, commutative, reciprocal, negate, strict, loose,
  condition,
} = {}) {
  return function (implementation, callerType, ...calleeTypes) {
    if (equal) {
      new Equal(name, implementation, callerType, calleeTypes[0]);
    } else if (unequal) {
      new Unequal(name, implementation, callerType, calleeTypes[0]);
    } else if (commutative) {
      new Commute(name, implementation, callerType, calleeTypes[0]);
    } else if (symmetric) {
      new Symmetric(name, implementation, callerType, calleeTypes[0]);
    } else if (!calleeTypes.length) {
      new Binary(name, implementation, callerType, callerType);
    } else if (calleeTypes.length === 1) {
      new Binary(name, implementation, callerType, calleeTypes[0]);
    } else {
      new Method(name, implementation, callerType, ...calleeTypes);
    }

    if (reciprocal) {
      new Reciprocal(reciprocal, name, callerType, calleeTypes[0]);
    }

    if (calleeTypes.length) {
      if (negate) {
        new Negate(negate, name, callerType, ...calleeTypes);
      }

      if (strict && (condition || unequal)) {
        new Stricter(strict, name, condition || unequal, callerType,
          ...calleeTypes);
      }

      if (loose && (condition || equal)) {
        new Looser(strict, name, condition || equal, callerType,
          ...calleeTypes);
      }
    } else {
      if (negate) {
        new Negate(negate, name, callerType, callerType);
      }

      if (strict && (condition || unequal)) {
        new Stricter(strict, name, condition || unequal, callerType,
          callerType);
      }

      if (loose && (condition || equal)) {
        new Looser(strict, name, condition || equal, callerType, callerType);
      }
    }
  };
}

export {
  Binary,
  Commute,
  Equal,
  Looser,
  Method,
  Negate,
  Reciprocal,
  Stricter,
  Symmetric,
  Unequal,
};

export {succeed, fail} from './implementations';
