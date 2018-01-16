'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _binary = require('./binary');

var _binary2 = _interopRequireDefault(_binary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Commute = function Commute(name, implementation, callerType, calleeType) {
  _classCallCheck(this, Commute);

  new _binary2.default(name, implementation, callerType, calleeType);

  if (callerType !== calleeType && calleeType !== undefined) {
    new _binary2.default(name, implementation, calleeType, callerType);
  }
};

exports.default = Commute;
module.exports = exports['default'];