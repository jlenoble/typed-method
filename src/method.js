import sig from 'sig';
import Caller from './caller';
import Callees from './callees';

const _methods = new Set();

export default class Method {
  constructor (name, implementation, callerType, ...calleeTypes) {
    const caller = new Caller(callerType);
    const callees = new Callees(calleeTypes);

    const _type = caller.sig;
    const _name = sig(name + callees.sig);
    const _method = _type + _name;

    // Don't overwrite silently implementations
    if (_methods.has(_method)) {
      throw new Error(`Method '${name}' already defined for caller type '${
        callerType.name}' and callee types [${calleeTypes.map(
        Type => `'${Type.name}'`).join(', ')}]`);
    }

    _methods.add(_method);

    callees[_type] = caller;
    caller[_name] = implementation;

    const method = function (...args) {
      const callees = Callees.get(args);
      const _name = sig(name + callees.sig);
      // eslint-disable-next-line no-invalid-this
      return callees[_type][_name].apply(this, args);
    };

    // eslint-disable-next-line no-param-reassign
    callerType.prototype[name] = method;
  }
}
