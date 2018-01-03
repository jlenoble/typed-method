import {getSpreadArgs} from '../input';

const _implementations = new Map();

export function hasImplementation (key) {
  return _implementations.has(key);
}

export function getImplementation (key) {
  return _implementations.get(key);
}

export function getOptimized (name, callerType, calleeTypes) {
  const implementation = _implementations.get(getSpreadArgs(
    name, callerType, calleeTypes)._method);
  return implementation
    ? implementation.optimized
      ? implementation.optimized
      : implementation.implementation
    : undefined;
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
