'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _callees = require('../callees');

var _callees2 = _interopRequireDefault(_callees);

var _processInit = require('../process-init');

var _implementations = require('../implementations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Method = function Method(name, implementation, callerType) {
  _classCallCheck(this, Method);

  for (var _len = arguments.length, calleeTypes = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    calleeTypes[_key - 3] = arguments[_key];
  }

  var _processInitSpreadArg = (0, _processInit.processInitSpreadArgs)(name, callerType, calleeTypes),
      caller = _processInitSpreadArg.caller,
      callees = _processInitSpreadArg.callees,
      _type = _processInitSpreadArg._type,
      _name = _processInitSpreadArg._name,
      _method = _processInitSpreadArg._method;

  callees[_type] = caller;
  caller[_name] = implementation;

  var method = function method() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var callees = _callees2.default.get(args);
    var _name = name + callees.sig;
    // eslint-disable-next-line no-invalid-this
    return callees[_type][_name].apply(this, args);
  };

  (0, _implementations.setImplementation)(_method, implementation);

  // eslint-disable-next-line no-param-reassign
  callerType.prototype[name] = method;
};

exports.default = Method;
module.exports = exports['default'];