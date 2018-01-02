const _methods = new Map();

// ***************************************************************
// Reciprocal
// ***************************************************************
export function reciprocal (name) {
  const _method = name + ':reciprocal';
  let reciprocalImplementation = _methods.get(_method);

  if (!reciprocalImplementation) {
    reciprocalImplementation = function (obj) {
      return obj[name](this); // eslint-disable-line no-invalid-this
    };

    _methods.set(_method, reciprocalImplementation);
  }

  return reciprocalImplementation;
}

export function optimizedReciprocal (name, implementation) {
  let reciprocalImplementation;

  switch (implementation) {
  case succeed: case fail:
    reciprocalImplementation = implementation;
    break;

  default:
    reciprocalImplementation = reciprocal(name);
  }

  return reciprocalImplementation;
}

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
  let negateImplementation;

  switch (implementation) {
  case succeed:
    negateImplementation = fail;
    break;

  case fail:
    negateImplementation = succeed;
    break;

  default:
    negateImplementation = negate(name, nCallees);
  }

  return negateImplementation;
}

// ***************************************************************
// Special implementations to shunt computations
// ***************************************************************
export function succeed () {
  return true;
};

export function fail () {
  return false;
};
