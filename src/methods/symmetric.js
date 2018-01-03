import Binary from './binary';
import {ReciprocalImplementation} from '../implementations';

export default class Symmetric {
  constructor (name, implementation, callerType, calleeType) {
    new Binary(name, implementation, callerType, calleeType);

    if (callerType !== calleeType) {
      new Binary(
        name,
        new ReciprocalImplementation(name, name, callerType,
          calleeType).optimized,
        calleeType || callerType,
        callerType
      );
    }
  }
}
