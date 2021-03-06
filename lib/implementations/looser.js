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

function optimize(implementation, conditionImplementation) {
  if (conditionImplementation === _functions.fail) {
    return implementation;
  }

  if (conditionImplementation === _functions.succeed) {
    return _functions.succeed;
  }

  if (implementation === _functions.succeed) {
    return _functions.succeed;
  }
}

var LooserImplementation = function (_Implementation) {
  _inherits(LooserImplementation, _Implementation);

  function LooserImplementation(name, implementation, conditionImplementation, callerType, calleeTypes) {
    _classCallCheck(this, LooserImplementation);

    var args = (0, _input.getSpreadArgs)(name, callerType, calleeTypes);

    var _this = _possibleConstructorReturn(this, (LooserImplementation.__proto__ || Object.getPrototypeOf(LooserImplementation)).call(this, 'looser:' + args._method, calleeTypes.length === 1 ? function (obj) {
      // eslint-disable-next-line no-invalid-this
      return conditionImplementation.call(this, obj)
      // eslint-disable-next-line no-invalid-this
      || implementation.call(this, obj);
    } : function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // eslint-disable-next-line no-invalid-this
      return conditionImplementation.apply(this, args)
      // eslint-disable-next-line no-invalid-this
      || implementation.apply(this, args);
    }));

    Object.defineProperty(_this, 'optimized', {
      value: optimize(implementation, conditionImplementation) || _this.implementation,
      enumerable: true
    });
    return _this;
  }

  return LooserImplementation;
}(_implementation2.default);

exports.default = LooserImplementation;