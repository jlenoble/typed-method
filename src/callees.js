import Callee from './callee';

const _callees = new Map();

export const getSig = Types => Types.map(Type => new Callee(Type).sig).join('');

export default class Callees {
  constructor (Types) {
    const signature = getSig(Types);
    const callees = _callees.get(signature);

    if (callees) {
      return callees;
    }

    Object.defineProperty(this, 'sig', {
      value: signature,
      enumerable: true,
    });

    _callees.set(signature, this);
  }
};

Callees.get = function (callees) {
  return _callees.get(getSig(callees.map(callee => callee.constructor)));
};
