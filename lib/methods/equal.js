'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _binary = require('./binary');

var _binary2 = _interopRequireDefault(_binary);

var _symmetric = require('./symmetric');

var _symmetric2 = _interopRequireDefault(_symmetric);

var _implementations = require('../implementations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Equal = function Equal(name, implementation, callerType, calleeType) {
  _classCallCheck(this, Equal);

  if (callerType === calleeType || calleeType === undefined) {
    new _binary2.default(name, implementation, callerType, calleeType);
  } else {
    new _symmetric2.default(name, _implementations.fail, callerType, calleeType);
  }
};

exports.default = Equal;
module.exports = exports['default'];