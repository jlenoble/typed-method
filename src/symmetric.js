import Caller from './caller';
import Callee from './callee';

const _methods = new Set();
const _symmetric = new Map();

export default class Symmetric {
  constructor (name, implementation, callerType, calleeType) {
    const caller = new Caller(callerType);
    const callee = new Callee(calleeType);

    const _type = caller.sig;
    const _name = name + callee.sig;
    const _method = _type + _name;

    // Prevent a max call stack exception
    if (_methods.has(_method)) {
      return;
    }

    _methods.add(_method);

    callee[_type] = caller;
    caller[_name] = implementation;

    const method = function (obj) {
      const callee = new Callee(obj.constructor);
      const _name = name + callee.sig;
      // eslint-disable-next-line no-invalid-this
      return callee[_type][_name].call(this, obj);
    };

    // eslint-disable-next-line no-param-reassign
    callerType.prototype[name] = method;

    if (callerType !== calleeType) {
      let symmetric = _symmetric.get(name);

      if (!symmetric) {
        symmetric = function (obj) {
          return obj[name](this); // eslint-disable-line no-invalid-this
        };
        _symmetric.set(name, symmetric);
      }

      new Symmetric(name, symmetric, calleeType, callerType);
    }
  }
}
