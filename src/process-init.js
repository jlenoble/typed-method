import {getArgs, getSpreadArgs} from './input';

const _methods = new Set();

export function processInitArgs (name, callerType, calleeType) {
  const args = getArgs(name, callerType, calleeType);

  // Don't overwrite silently implementations
  if (_methods.has(args._method)) {
    throw new Error(`Method '${name}' already defined for caller type '${
      callerType.name}' and callee type '${calleeType.name}'`);
  }

  _methods.add(args._method);

  return args;
}

export function processInitSpreadArgs (name, callerType, calleeTypes) {
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
