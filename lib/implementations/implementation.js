'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasImplementation = hasImplementation;
exports.getImplementation = getImplementation;
exports.getOptimized = getOptimized;
exports.setImplementation = setImplementation;

var _input = require('../input');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _implementations = new Map();

function hasImplementation(key) {
  return _implementations.has(key);
}

function getImplementation(key) {
  return _implementations.get(key);
}

function getOptimized(name, callerType, calleeTypes) {
  var implementation = _implementations.get((0, _input.getSpreadArgs)(name, callerType, calleeTypes)._method);
  return implementation ? implementation.optimized ? implementation.optimized : implementation.implementation : undefined;
}

function setImplementation(key, implementation) {
  new Implementation(key, implementation);
}

var Implementation = function Implementation(key, implementation) {
  _classCallCheck(this, Implementation);

  var impl = _implementations.get(key);

  if (impl) {
    return impl;
  }

  Object.defineProperties(this, {
    key: {
      value: key,
      enumerable: true
    },

    implementation: {
      value: implementation,
      enumerable: true
    }
  });

  _implementations.set(key, this);
};

exports.default = Implementation;
;