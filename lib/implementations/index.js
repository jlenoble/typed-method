'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOptimized = exports.getImplementation = exports.setImplementation = exports.hasImplementation = exports.fail = exports.succeed = exports.LooserImplementation = exports.StricterImplementation = exports.NegateImplementation = exports.ReciprocalImplementation = undefined;

var _functions = require('./functions');

Object.defineProperty(exports, 'succeed', {
  enumerable: true,
  get: function get() {
    return _functions.succeed;
  }
});
Object.defineProperty(exports, 'fail', {
  enumerable: true,
  get: function get() {
    return _functions.fail;
  }
});

var _implementation = require('./implementation');

Object.defineProperty(exports, 'hasImplementation', {
  enumerable: true,
  get: function get() {
    return _implementation.hasImplementation;
  }
});
Object.defineProperty(exports, 'setImplementation', {
  enumerable: true,
  get: function get() {
    return _implementation.setImplementation;
  }
});
Object.defineProperty(exports, 'getImplementation', {
  enumerable: true,
  get: function get() {
    return _implementation.getImplementation;
  }
});
Object.defineProperty(exports, 'getOptimized', {
  enumerable: true,
  get: function get() {
    return _implementation.getOptimized;
  }
});

var _reciprocal = require('./reciprocal');

var _reciprocal2 = _interopRequireDefault(_reciprocal);

var _negate = require('./negate');

var _negate2 = _interopRequireDefault(_negate);

var _stricter = require('./stricter');

var _stricter2 = _interopRequireDefault(_stricter);

var _looser = require('./looser');

var _looser2 = _interopRequireDefault(_looser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ReciprocalImplementation = _reciprocal2.default;
exports.NegateImplementation = _negate2.default;
exports.StricterImplementation = _stricter2.default;
exports.LooserImplementation = _looser2.default;