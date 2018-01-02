const _methods = new Map();

export function getReciprocalImplementation (name, implementation) {
  let reciprocalImplementation;

  switch (implementation) {
  case succeed: case fail:
    reciprocalImplementation = implementation;
    break;

  default:
    const _method = name + ':reciprocal';
    reciprocalImplementation = _methods.get(_method);

    if (!reciprocalImplementation) {
      reciprocalImplementation = reciprocal(name);

      _methods.set(_method, reciprocalImplementation);
    }
  }

  return reciprocalImplementation;
}

export function getNegateImplementation (name, implementation, nCallees) {
  let negateImplementation;

  switch (implementation) {
  case succeed:
    negateImplementation = fail;
    break;

  case fail:
    negateImplementation = succeed;
    break;

  default:
    const _method = name + `:negate(${nCallees})`;
    negateImplementation = _methods.get(_method);

    if (!negateImplementation) {
      negateImplementation = negate(name, nCallees);

      _methods.set(_method, negateImplementation);
    }
  }

  return negateImplementation;
}

export function reciprocal (name) {
  return function (obj) {
    return obj[name](this); // eslint-disable-line no-invalid-this
  };
}

export function negate (name, nCallees) {
  return nCallees === 1
    ? function (obj) {
      return !this[name](obj); // eslint-disable-line no-invalid-this
    }
    : function (...args) {
      return !this[name](...args); // eslint-disable-line no-invalid-this
    };
}

export function succeed () {
  return true;
};

export function fail () {
  return false;
};
