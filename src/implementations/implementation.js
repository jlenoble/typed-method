const _implementations = new Map();

export function hasImplementation (key) {
  return _implementations.has(key);
}

export function setImplementation (key, implementation) {
  _implementations.set(key, implementation);
}

export default class Implementation {
  construction (key, implementation) {
    const impl = _implementations.get(key);

    if (impl) {
      return impl;
    }

    Object.defineProperties(this, {
      key: {
        value: key,
        enumerable: true,
      },

      implementation: {
        value: implementation,
        enumerable: true,
      },
    });

    _implementations.set(key, this);

    Object.defineProperty(this, 'optimized', {
      value: this._optimize(),
      enumerable: true,
    });
  }
}
