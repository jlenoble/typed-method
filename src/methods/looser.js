import Method from './method';
import Binary from './binary';
import {LooserImplementation, getOptimized} from '../implementations';

export default class Looser {
  constructor (
    looserName,
    originalName,
    conditionName,
    callerType,
    ...calleeTypes
  ) {
    const impl = getOptimized(originalName, callerType, calleeTypes);
    const impl2 = getOptimized(conditionName, callerType, calleeTypes);

    const looserImplementation = new LooserImplementation(
      originalName,
      impl, impl2,
      callerType,
      calleeTypes
    ).optimized;

    if (calleeTypes.length === 1) {
      const calleeType = calleeTypes[0];

      new Binary(looserName, looserImplementation, callerType, calleeType);
    } else {
      new Method(looserName, looserImplementation, callerType,
        ...calleeTypes);
    }
  }
}
