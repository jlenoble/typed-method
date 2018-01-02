import Binary from './binary';

export default class Symmetric {
  constructor (name, implementation, callerType, calleeType) {
    function symmetric (obj) {
      return obj[name](this); // eslint-disable-line no-invalid-this
    }

    new Binary(name, implementation, callerType, calleeType);

    if (callerType !== calleeType) {
      new Binary(name, symmetric, calleeType, callerType);
    }
  }
}
