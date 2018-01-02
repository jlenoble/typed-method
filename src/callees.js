import sig from 'sig';
import Caller from './caller';

const _callees = new Map();

const getSig = Types => sig(Types.map(Type => new Caller(Type).sig).join(','));

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
