const _methods = new Map();

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
    const _method = name + `(${nCallees})`;
    negateImplementation = _methods.get(_method);

    if (!negateImplementation) {
      negateImplementation = nCallees === 1 ? function (obj) {
        return !this[name](obj); // eslint-disable-line no-invalid-this
      } : function (...args) {
        return !this[name](...args); // eslint-disable-line no-invalid-this
      };

      _methods.set(_method, negateImplementation);
    }
  }

  return negateImplementation;
}

export function succeed () {
  return true;
};

export function fail () {
  return false;
};
