'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optimize = optimize;

var _implementation = require('./implementation');

var _implementation2 = _interopRequireDefault(_implementation);

var _functions = require('./functions');

var _input = require('../input');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function optimize(implementation) {
  switch (implementation) {
    case _functions.succeed:case _functions.fail:
      return implementation;

    default:
    // Do nothing
  }
}

var ReciprocalImplementation = function (_Implementation) {
  _inherits(ReciprocalImplementation, _Implementation);

  function ReciprocalImplementation(name, implementation, callerType, calleeType) {
    _classCallCheck(this, ReciprocalImplementation);

    var args = (0, _input.getArgs)(name, callerType, calleeType);

    var _this = _possibleConstructorReturn(this, (ReciprocalImplementation.__proto__ || Object.getPrototypeOf(ReciprocalImplementation)).call(this, 'reciprocal:' + args._method, function (obj) {
      return obj[name](this); // eslint-disable-line no-invalid-this
    }));

    Object.defineProperty(_this, 'optimized', {
      value: optimize(implementation) || _this.implementation,
      enumerable: true
    });
    return _this;
  }

  return ReciprocalImplementation;
}(_implementation2.default);

exports.default = ReciprocalImplementation;