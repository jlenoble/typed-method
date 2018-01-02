import Caller from './caller';
import Callee from './callee';
import Callees from './callees';

const _methods = new Set();

export function processArgs (name, callerType, calleeType) {
  const caller = new Caller(callerType);
  const callee = new Callee(calleeType || callerType);
  const _type = caller.sig;
  const _name = name + callee.sig;
  const _method = _type + _name;

  // Don't overwrite silently implementations
  if (_methods.has(_method)) {
    throw new Error(`Method '${name}' already defined for caller type '${
      callerType.name}' and callee type '${calleeType.name}'`);
  }

  _methods.add(_method);

  return {caller, callee, _type, _name};
}

export function processSpreadArgs (name, callerType, calleeTypes) {
  const caller = new Caller(callerType);
  const callees = new Callees(calleeTypes);
  const _type = caller.sig;
  const _name = name + callees.sig;
  const _method = _type + _name;

  // Don't overwrite silently implementations
  if (_methods.has(_method)) {
    throw new Error(`Method '${name}' already defined for caller type '${
      callerType.name}' and callee types [${calleeTypes.map(
      Type => `'${Type.name}'`).join(', ')}]`);
  }

  _methods.add(_method);

  return {caller, callees, _type, _name};
}
