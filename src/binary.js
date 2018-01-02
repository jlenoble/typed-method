import Caller from './caller';
import Callee from './callee';

export default class Binary {
  constructor (name, implementation, callerType, calleeType) {
    const caller = new Caller(callerType);
    const callee = new Callee(calleeType);

    const _type = caller.sig;
    const _name = name + callee.sig;

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
  }
}
