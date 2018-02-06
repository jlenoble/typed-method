'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fail = exports.succeed = exports.Unequal = exports.Symmetric = exports.Stricter = exports.Reciprocal = exports.Negate = exports.Method = exports.Looser = exports.Equal = exports.Commute = exports.Binary = undefined;
exports.default = method;

var _implementations = require('./implementations');

Object.defineProperty(exports, 'succeed', {
  enumerable: true,
  get: function get() {
    return _implementations.succeed;
  }
});
Object.defineProperty(exports, 'fail', {
  enumerable: true,
  get: function get() {
    return _implementations.fail;
  }
});

var _methods = require('./methods');

function method(name) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      equal = _ref.equal,
      unequal = _ref.unequal,
      symmetric = _ref.symmetric,
      commutative = _ref.commutative,
      reciprocal = _ref.reciprocal,
      negate = _ref.negate,
      strict = _ref.strict,
      loose = _ref.loose,
      condition = _ref.condition;

  return function (implementation, callerType) {
    for (var _len = arguments.length, calleeTypes = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      calleeTypes[_key - 2] = arguments[_key];
    }

    if (equal) {
      new _methods.Equal(name, implementation, callerType, calleeTypes[0]);
    } else if (unequal) {
      new _methods.Unequal(name, implementation, callerType, calleeTypes[0]);
    } else if (commutative) {
      new _methods.Commute(name, implementation, callerType, calleeTypes[0]);
    } else if (symmetric) {
      new _methods.Symmetric(name, implementation, callerType, calleeTypes[0]);
    } else if (!calleeTypes.length) {
      new _methods.Binary(name, implementation, callerType, callerType);
    } else if (calleeTypes.length === 1) {
      new _methods.Binary(name, implementation, callerType, calleeTypes[0]);
    } else {
      new (Function.prototype.bind.apply(_methods.Method, [null].concat([name, implementation, callerType], calleeTypes)))();
    }

    if (reciprocal) {
      new _methods.Reciprocal(reciprocal, name, callerType, calleeTypes[0]);
    }

    if (calleeTypes.length > 1) {
      if (negate) {
        new (Function.prototype.bind.apply(_methods.Negate, [null].concat([negate, name, callerType], calleeTypes)))();
      }

      if (strict && condition) {
        new (Function.prototype.bind.apply(_methods.Stricter, [null].concat([strict, name, condition, callerType], calleeTypes)))();
      }

      if (loose && condition) {
        new (Function.prototype.bind.apply(_methods.Looser, [null].concat([loose, name, condition, callerType], calleeTypes)))();
      }
    } else if (calleeTypes.length === 1) {
      if (negate) {
        new _methods.Negate(negate, name, callerType, calleeTypes[0]);

        if ((equal || unequal || commutative) && callerType !== calleeTypes[0]) {
          new _methods.Negate(negate, name, calleeTypes[0], callerType);
        }
      }

      if (strict && condition) {
        new _methods.Stricter(strict, name, condition, callerType, calleeTypes[0]);
      }

      if (loose && condition) {
        new _methods.Looser(loose, name, condition, callerType, calleeTypes[0]);
      }
    } else {
      if (negate) {
        new _methods.Negate(negate, name, callerType, callerType);
      }

      if (strict && condition) {
        new _methods.Stricter(strict, name, condition, callerType, callerType);
      }

      if (loose && condition) {
        new _methods.Looser(loose, name, condition, callerType, callerType);
      }
    }
  };
}

exports.Binary = _methods.Binary;
exports.Commute = _methods.Commute;
exports.Equal = _methods.Equal;
exports.Looser = _methods.Looser;
exports.Method = _methods.Method;
exports.Negate = _methods.Negate;
exports.Reciprocal = _methods.Reciprocal;
exports.Stricter = _methods.Stricter;
exports.Symmetric = _methods.Symmetric;
exports.Unequal = _methods.Unequal;