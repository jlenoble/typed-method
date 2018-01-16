'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _binary = require('./binary');

var _binary2 = _interopRequireDefault(_binary);

var _implementations = require('../implementations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Reciprocal = function Reciprocal(reciprocalName, originalName, callerType, calleeType) {
  _classCallCheck(this, Reciprocal);

  var implementation = (0, _implementations.getOptimized)(originalName, callerType, [calleeType || callerType]);

  new _binary2.default(reciprocalName, new _implementations.ReciprocalImplementation(originalName, implementation, callerType, calleeType).optimized, calleeType || callerType, callerType);
};

exports.default = Reciprocal;
module.exports = exports['default'];