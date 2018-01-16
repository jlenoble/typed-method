'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _callee = require('../callee');

var _callee2 = _interopRequireDefault(_callee);

var _processInit = require('../process-init');

var _implementations = require('../implementations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Binary = function Binary(name, implementation, callerType, calleeType) {
  _classCallCheck(this, Binary);

  var _processInitArgs = (0, _processInit.processInitArgs)(name, callerType, calleeType),
      caller = _processInitArgs.caller,
      callee = _processInitArgs.callee,
      _type = _processInitArgs._type,
      _name = _processInitArgs._name,
      _method = _processInitArgs._method;

  callee[_type] = caller;
  caller[_name] = implementation;

  var method = function method(obj) {
    var callee = new _callee2.default(obj.constructor);
    var _name = name + callee.sig;
    // eslint-disable-next-line no-invalid-this
    return callee[_type][_name].call(this, obj);
  };

  (0, _implementations.setImplementation)(_method, implementation);

  // eslint-disable-next-line no-param-reassign
  callerType.prototype[name] = method;
};

exports.default = Binary;
module.exports = exports['default'];