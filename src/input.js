import Caller from './caller';
import Callee from './callee';
import Callees from './callees';

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
