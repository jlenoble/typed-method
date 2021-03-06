import Callee from '../callee';
import {processInitArgs} from '../process-init';
import {setImplementation} from '../implementations';

export default class Binary {
  constructor (name, implementation, callerType, calleeType) {
    const {caller, callee, _type, _name, _method} = processInitArgs(
      name, callerType, calleeType);

    callee[_type] = caller;
    caller[_name] = implementation;

    const method = function (obj) {
      const callee = new Callee(obj.constructor);
      const _name = name + callee.sig;
      // eslint-disable-next-line no-invalid-this
      return callee[_type][_name].call(this, obj);
    };

    setImplementation(_method, implementation);

    // eslint-disable-next-line no-param-reassign
    callerType.prototype[name] = method;
  }
}
