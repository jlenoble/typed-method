import Binary from './binary';

const _methods = new Map();

export default class Reciprocal {
  constructor (name, reciprocalName, implementation, callerType, calleeType) {
    let reciprocal = _methods.get(name);

    if (!reciprocal) {
      function recip (obj) {
        return obj[name](this); // eslint-disable-line no-invalid-this
      }
      _methods.set(name, recip);
      reciprocal = recip;
    }

    new Binary(name, implementation, callerType, calleeType);

    this._makeReciprocal(reciprocalName, reciprocal, callerType, calleeType);
  }

  _makeReciprocal (name, reciprocal, callerType, calleeType) {
    new Binary(name, reciprocal, calleeType, callerType);
  }
}
