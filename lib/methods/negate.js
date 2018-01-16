'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _method = require('./method');

var _method2 = _interopRequireDefault(_method);

var _binary = require('./binary');

var _binary2 = _interopRequireDefault(_binary);

var _implementations = require('../implementations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Negate = function Negate(negateName, originalName, callerType) {
  _classCallCheck(this, Negate);

  for (var _len = arguments.length, calleeTypes = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    calleeTypes[_key - 3] = arguments[_key];
  }

  var implementation = (0, _implementations.getOptimized)(originalName, callerType, calleeTypes);

  var negateImplementation = new _implementations.NegateImplementation(originalName, implementation, callerType, calleeTypes).optimized;

  if (calleeTypes.length === 1) {
    var calleeType = calleeTypes[0];

    new _binary2.default(negateName, negateImplementation, callerType, calleeType);
  } else {
    new (Function.prototype.bind.apply(_method2.default, [null].concat([negateName, negateImplementation, callerType], calleeTypes)))();
  }
};

exports.default = Negate;
module.exports = exports['default'];