const _callers = new WeakMap();
let _signature = 0;

export default class Caller {
  constructor (Type) {
    const caller = _callers.get(Type);

    if (caller) {
      return caller;
    }

    ++_signature;

    Object.defineProperty(this, 'sig', {
      value: _signature,
      enumerable: true,
    });

    _callers.set(Type, this);
  }
};
