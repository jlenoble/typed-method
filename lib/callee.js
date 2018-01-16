'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _callees = new WeakMap();
var _signature = 0;

var Callee = function Callee(Type) {
  _classCallCheck(this, Callee);

  var callee = _callees.get(Type);

  if (callee) {
    return callee;
  }

  --_signature;

  Object.defineProperty(this, 'sig', {
    value: _signature,
    enumerable: true
  });

  _callees.set(Type, this);
};

exports.default = Callee;
;
module.exports = exports['default'];