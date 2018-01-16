'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSig = undefined;

var _callee = require('./callee');

var _callee2 = _interopRequireDefault(_callee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _callees = new Map();

var getSig = exports.getSig = function getSig(Types) {
  return Types.map(function (Type) {
    return new _callee2.default(Type).sig;
  }).join('');
};

var Callees = function Callees(Types) {
  _classCallCheck(this, Callees);

  var signature = getSig(Types);
  var callees = _callees.get(signature);

  if (callees) {
    return callees;
  }

  Object.defineProperty(this, 'sig', {
    value: signature,
    enumerable: true
  });

  _callees.set(signature, this);
};

exports.default = Callees;
;

Callees.get = function (callees) {
  return _callees.get(getSig(callees.map(function (callee) {
    return callee.constructor;
  })));
};