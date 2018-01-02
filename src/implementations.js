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
  switch (implementation) {
  case succeed: case fail:
    return implementation;

  default:
    return reciprocal(name);
  }
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
  switch (implementation) {
  case succeed:
    return fail;

  case fail:
    return succeed;

  default:
    return negate(name, nCallees);
  }
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
