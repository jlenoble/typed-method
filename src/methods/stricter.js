import Method from './method';
import Binary from './binary';
import {StricterImplementation, getOptimized} from '../implementations';

export default class Stricter {
  constructor (
    stricterName,
    originalName,
    conditionName,
    callerType,
    ...calleeTypes
  ) {
    const impl = getOptimized(originalName, callerType, calleeTypes);
    const impl2 = getOptimized(conditionName, callerType, calleeTypes);

    const stricterImplementation = new StricterImplementation(
      originalName,
      impl, impl2,
      callerType,
      calleeTypes
    ).optimized;

    if (calleeTypes.length === 1) {
      const calleeType = calleeTypes[0];

      new Binary(stricterName, stricterImplementation, callerType, calleeType);
    } else {
      new Method(stricterName, stricterImplementation, callerType,
        ...calleeTypes);
    }
  }
}
