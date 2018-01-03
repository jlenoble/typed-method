import Method from './method';
import Binary from './binary';
import {NegateImplementation} from '../implementations';

export default class Negate {
  constructor (name, negateName, implementation, callerType, ...calleeTypes) {
    const negateImplementation = new NegateImplementation(
      name,
      implementation,
      callerType,
      calleeTypes
    ).optimized;

    if (calleeTypes.length === 1) {
      const calleeType = calleeTypes[0];

      new Binary(name, implementation, callerType, calleeType);
      new Binary(negateName, negateImplementation, callerType, calleeType);
    } else {
      new Method(name, implementation, callerType, ...calleeTypes);
      new Method(negateName, negateImplementation, callerType, ...calleeTypes);
    }
  }
}
