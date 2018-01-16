'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _callers = new WeakMap();
var _signature = 0;

var Caller = function Caller(Type) {
  _classCallCheck(this, Caller);

  var caller = _callers.get(Type);

  if (caller) {
    return caller;
  }

  ++_signature;

  Object.defineProperty(this, 'sig', {
    value: _signature,
    enumerable: true
  });

  _callers.set(Type, this);
};

exports.default = Caller;
;
module.exports = exports['default'];