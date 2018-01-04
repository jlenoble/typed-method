import Binary from './binary';
import {ReciprocalImplementation, getOptimized} from '../implementations';

export default class Reciprocal {
  constructor (reciprocalName, originalName, callerType, calleeType) {
    const implementation = getOptimized(originalName, callerType,
      [calleeType || callerType]);

    new Binary(
      reciprocalName,
      new ReciprocalImplementation(originalName, implementation, callerType,
        calleeType).optimized,
      calleeType || callerType,
      callerType
    );
  }
}
