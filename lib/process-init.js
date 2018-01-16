'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processInitArgs = processInitArgs;
exports.processInitSpreadArgs = processInitSpreadArgs;

var _input = require('./input');

var _implementations = require('./implementations');

function processInitArgs(name, callerType, calleeType) {
  var args = (0, _input.getArgs)(name, callerType, calleeType);

  // Don't overwrite silently implementations
  if ((0, _implementations.hasImplementation)(args._method)) {
    throw new Error('Method \'' + name + '\' already defined for caller type \'' + callerType.name + '\' and callee type \'' + calleeType.name + '\'');
  }

  return args;
}

function processInitSpreadArgs(name, callerType, calleeTypes) {
  var args = (0, _input.getSpreadArgs)(name, callerType, calleeTypes);

  // Don't overwrite silently implementations
  if ((0, _implementations.hasImplementation)(args._method)) {
    throw new Error('Method \'' + name + '\' already defined for caller type \'' + callerType.name + '\' and callee types [' + calleeTypes.map(function (Type) {
      return '\'' + Type.name + '\'';
    }).join(', ') + ']');
  }

  return args;
}