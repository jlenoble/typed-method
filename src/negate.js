import Method from './method';
import Binary from './binary';
import {getNegateImplementation} from './implementations';

export default class Negate {
  constructor (name, negateName, implementation, callerType, ...calleeTypes) {
    const negateImplementation = getNegateImplementation(
      name,
      implementation,
      calleeTypes.length
    );

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
