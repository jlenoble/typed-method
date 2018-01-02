import Callees from './callees';
import {processSpreadArgs} from './input';

const _methods = new Set();

export default class Method {
  constructor (name, implementation, callerType, ...calleeTypes) {
    const {caller, callees, _type, _name, _method} = processSpreadArgs(
      name, callerType, calleeTypes);

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
      const _name = name + callees.sig;
      // eslint-disable-next-line no-invalid-this
      return callees[_type][_name].apply(this, args);
    };

    // eslint-disable-next-line no-param-reassign
    callerType.prototype[name] = method;
  }
}
