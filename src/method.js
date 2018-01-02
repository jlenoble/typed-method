import sig from 'sig';
import Caller from './caller';
import Callees from './callees';

export default class Method {
  constructor (name, implementation, callerType, ...calleeTypes) {
    const caller = new Caller(callerType);
    const callees = new Callees(calleeTypes);

    const _type = caller.sig;
    const _name = sig(name + callees.sig);

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
