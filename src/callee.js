const _callees = new WeakMap();
let _signature = 0;

export default class Callee {
  constructor (Type) {
    const callee = _callees.get(Type);

    if (callee) {
      return callee;
    }

    --_signature;

    Object.defineProperty(this, 'sig', {
      value: _signature,
      enumerable: true,
    });

    _callees.set(Type, this);
  }
};
