import Method from './method';
import Binary from './binary';
import {NegateImplementation, getOptimized} from '../implementations';

export default class Negate {
  constructor (negateName, originalName, callerType, ...calleeTypes) {
    const implementation = getOptimized(originalName, callerType, calleeTypes);

    const negateImplementation = new NegateImplementation(
      originalName,
      implementation,
      callerType,
      calleeTypes
    ).optimized;

    if (calleeTypes.length === 1) {
      const calleeType = calleeTypes[0];

      new Binary(negateName, negateImplementation, callerType, calleeType);
    } else {
      new Method(negateName, negateImplementation, callerType, ...calleeTypes);
    }
  }
}
