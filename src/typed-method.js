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
  condition, strictReciprocal, looseReciprocal,
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

    if (calleeTypes.length > 1) {
      if (negate) {
        new Negate(negate, name, callerType, ...calleeTypes);
      }

      if (strict && condition) {
        new Stricter(strict, name, condition, callerType,
          ...calleeTypes);
      }

      if (loose && condition) {
        new Looser(loose, name, condition, callerType,
          ...calleeTypes);
      }
    } else if (calleeTypes.length === 1) {
      if (negate) {
        new Negate(negate, name, callerType, calleeTypes[0]);

        if ((equal || unequal || commutative || symmetric) &&
          callerType !== calleeTypes[0]) {
          new Negate(negate, name, calleeTypes[0], callerType);
        }
      }

      if (strict && condition) {
        new Stricter(strict, name, condition, callerType, calleeTypes[0]);

        if (strictReciprocal) {
          new Reciprocal(strictReciprocal, strict, callerType, calleeTypes[0]);
        }
      }

      if (loose && condition) {
        new Looser(loose, name, condition, callerType, calleeTypes[0]);

        if (looseReciprocal) {
          new Reciprocal(looseReciprocal, loose, callerType, calleeTypes[0]);
        }
      }
    } else {
      if (negate) {
        new Negate(negate, name, callerType, callerType);
      }

      if (strict && condition) {
        new Stricter(strict, name, condition, callerType, callerType);

        if (strictReciprocal) {
          new Reciprocal(strictReciprocal, strict, callerType, callerType);
        }
      }

      if (loose && condition) {
        new Looser(loose, name, condition, callerType, callerType);

        if (looseReciprocal) {
          new Reciprocal(looseReciprocal, loose, callerType, callerType);
        }
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
