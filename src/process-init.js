import {getArgs, getSpreadArgs} from './input';
import {hasImplementation} from './implementations/implementation';

export function processInitArgs (name, callerType, calleeType) {
  const args = getArgs(name, callerType, calleeType);

  // Don't overwrite silently implementations
  if (hasImplementation(args._method)) {
    throw new Error(`Method '${name}' already defined for caller type '${
      callerType.name}' and callee type '${calleeType.name}'`);
  }

  return args;
}

export function processInitSpreadArgs (name, callerType, calleeTypes) {
  const args = getSpreadArgs(name, callerType, calleeTypes);

  // Don't overwrite silently implementations
  if (hasImplementation(args._method)) {
    throw new Error(`Method '${name}' already defined for caller type '${
      callerType.name}' and callee types [${calleeTypes.map(
      Type => `'${Type.name}'`).join(', ')}]`);
  }

  return args;
}
