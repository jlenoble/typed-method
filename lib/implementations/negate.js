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
    case _functions.succeed:
      return _functions.fail;

    case _functions.fail:
      return _functions.succeed;

    default:
    // Do nothing
  }
}

var NegateImplementation = function (_Implementation) {
  _inherits(NegateImplementation, _Implementation);

  function NegateImplementation(name, implementation, callerType, calleeTypes) {
    _classCallCheck(this, NegateImplementation);

    var args = (0, _input.getSpreadArgs)(name, callerType, calleeTypes);

    var _this = _possibleConstructorReturn(this, (NegateImplementation.__proto__ || Object.getPrototypeOf(NegateImplementation)).call(this, 'negate:' + args._method, calleeTypes.length === 1 ? function (obj) {
      return !this[name](obj); // eslint-disable-line no-invalid-this
    } : function () {
      return !this[name].apply(this, arguments); // eslint-disable-line no-invalid-this
    }));

    Object.defineProperty(_this, 'optimized', {
      value: optimize(implementation) || _this.implementation,
      enumerable: true
    });
    return _this;
  }

  return NegateImplementation;
}(_implementation2.default);

exports.default = NegateImplementation;