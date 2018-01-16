'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _binary = require('./binary');

var _binary2 = _interopRequireDefault(_binary);

var _implementations = require('../implementations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Symmetric = function Symmetric(name, implementation, callerType, calleeType) {
  _classCallCheck(this, Symmetric);

  new _binary2.default(name, implementation, callerType, calleeType);

  if (callerType !== calleeType && calleeType !== undefined) {
    new _binary2.default(name, new _implementations.ReciprocalImplementation(name, name, callerType, calleeType).optimized, calleeType, callerType);
  }
};

exports.default = Symmetric;
module.exports = exports['default'];