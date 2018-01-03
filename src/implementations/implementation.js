const _implementations = new Map();

export function hasImplementation (key) {
  return _implementations.has(key);
}

export function setImplementation (key, implementation) {
  new Implementation(key, implementation);
}

export default class Implementation {
  constructor (key, implementation) {
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
  }
};
