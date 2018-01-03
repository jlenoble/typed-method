import Caller from './caller';
import Callee from './callee';
import Callees from './callees';

const _methods = new Set();

export function getArgs (name, callerType, calleeType) {
  const caller = new Caller(callerType);
  const callee = new Callee(calleeType || callerType);
  const _type = caller.sig;
  const _name = name + callee.sig;
  const _method = _type + _name;

  return {caller, callee, _type, _name, _method};
}

export function getSpreadArgs (name, callerType, calleeTypes) {
  const caller = new Caller(callerType);
  const callees = new Callees(calleeTypes);
  const _type = caller.sig;
  const _name = name + callees.sig;
  const _method = _type + _name;

  return {caller, callees, _type, _name, _method};
}

export function processArgs (name, callerType, calleeType) {
  const args = getArgs(name, callerType, calleeType);

  // Don't overwrite silently implementations
  if (_methods.has(args._method)) {
    throw new Error(`Method '${name}' already defined for caller type '${
      callerType.name}' and callee type '${calleeType.name}'`);
  }

  _methods.add(args._method);

  return args;
}

export function processSpreadArgs (name, callerType, calleeTypes) {
  const args = getSpreadArgs(name, callerType, calleeTypes);

  // Don't overwrite silently implementations
  if (_methods.has(args._method)) {
    throw new Error(`Method '${name}' already defined for caller type '${
      callerType.name}' and callee types [${calleeTypes.map(
      Type => `'${Type.name}'`).join(', ')}]`);
  }

  _methods.add(args._method);

  return args;
}
