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

var Looser = function Looser(looserName, originalName, conditionName, callerType) {
  _classCallCheck(this, Looser);

  for (var _len = arguments.length, calleeTypes = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    calleeTypes[_key - 4] = arguments[_key];
  }

  var impl = (0, _implementations.getOptimized)(originalName, callerType, calleeTypes);
  var impl2 = (0, _implementations.getOptimized)(conditionName, callerType, calleeTypes);

  var looserImplementation = new _implementations.LooserImplementation(originalName, impl, impl2, callerType, calleeTypes).optimized;

  if (calleeTypes.length === 1) {
    var calleeType = calleeTypes[0];

    new _binary2.default(looserName, looserImplementation, callerType, calleeType);
  } else {
    new (Function.prototype.bind.apply(_method2.default, [null].concat([looserName, looserImplementation, callerType], calleeTypes)))();
  }
};

exports.default = Looser;
module.exports = exports['default'];