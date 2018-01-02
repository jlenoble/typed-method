import Caller from './caller';
import Callee from './callee';

const _methods = new Set();

export default class Binary {
  constructor (name, implementation, callerType, calleeType) {
    const caller = new Caller(callerType);
    const callee = new Callee(calleeType || callerType);

    const _type = caller.sig;
    const _name = name + callee.sig;

    callee[_type] = caller;
    caller[_name] = implementation;
    const _method = _type + _name;

    // Don't overwrite silently implementations
    if (_methods.has(_method)) {
      throw new Error(`Method '${name}' already defined for caller type '${
        callerType.name}' and callee type '${calleeType.name}'`);
    }

    _methods.add(_method);

    const method = function (obj) {
      const callee = new Callee(obj.constructor);
      const _name = name + callee.sig;
      // eslint-disable-next-line no-invalid-this
      return callee[_type][_name].call(this, obj);
    };

    // eslint-disable-next-line no-param-reassign
    callerType.prototype[name] = method;
  }
}
