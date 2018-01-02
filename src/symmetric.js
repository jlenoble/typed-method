import Binary from './binary';

const _methods = new Map();

export default class Symmetric {
  constructor (name, implementation, callerType, calleeType) {
    let symmetric = _methods.get(name);

    if (!symmetric) {
      function sym (obj) {
        return obj[name](this); // eslint-disable-line no-invalid-this
      }
      _methods.set(name, sym);
      symmetric = sym;
    }

    new Binary(name, implementation, callerType, calleeType);

    if (callerType !== calleeType) {
      new Binary(name, symmetric, calleeType, callerType);
    }
  }
}
