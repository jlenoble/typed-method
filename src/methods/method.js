import Callees from '../callees';
import {processInitSpreadArgs} from '../process-init';
import {setImplementation} from '../implementations/implementation';

export default class Method {
  constructor (name, implementation, callerType, ...calleeTypes) {
    const {caller, callees, _type, _name, _method} = processInitSpreadArgs(
      name, callerType, calleeTypes);

    callees[_type] = caller;
    caller[_name] = implementation;

    const method = function (...args) {
      const callees = Callees.get(args);
      const _name = name + callees.sig;
      // eslint-disable-next-line no-invalid-this
      return callees[_type][_name].apply(this, args);
    };

    setImplementation(_method, method);

    // eslint-disable-next-line no-param-reassign
    callerType.prototype[name] = method;
  }
}
