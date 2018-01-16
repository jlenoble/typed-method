'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArgs = getArgs;
exports.getSpreadArgs = getSpreadArgs;

var _caller = require('./caller');

var _caller2 = _interopRequireDefault(_caller);

var _callee = require('./callee');

var _callee2 = _interopRequireDefault(_callee);

var _callees = require('./callees');

var _callees2 = _interopRequireDefault(_callees);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getArgs(name, callerType, calleeType) {
  var caller = new _caller2.default(callerType);
  var callee = new _callee2.default(calleeType || callerType);
  var _type = caller.sig;
  var _name = name + callee.sig;
  var _method = _type + _name;

  return { caller: caller, callee: callee, _type: _type, _name: _name, _method: _method };
}

function getSpreadArgs(name, callerType, calleeTypes) {
  var caller = new _caller2.default(callerType);
  var callees = new _callees2.default(calleeTypes);
  var _type = caller.sig;
  var _name = name + callees.sig;
  var _method = _type + _name;

  return { caller: caller, callees: callees, _type: _type, _name: _name, _method: _method };
}