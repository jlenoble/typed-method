import Binary from './binary';
import {ReciprocalImplementation} from '../implementations';

export default class Reciprocal {
  constructor (name, reciprocalName, implementation, callerType, calleeType) {
    new Binary(name, implementation, callerType, calleeType);

    this._makeReciprocal(
      reciprocalName,
      new ReciprocalImplementation(name, implementation, callerType,
        calleeType).optimized,
      callerType,
      calleeType || callerType
    );
  }

  _makeReciprocal (name, reciprocal, callerType, calleeType) {
    new Binary(name, reciprocal, calleeType, callerType);
  }
}
