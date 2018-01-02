import Binary from './binary';
import {getReciprocalImplementation} from './implementations';

export default class Reciprocal {
  constructor (name, reciprocalName, implementation, callerType, calleeType) {
    const reciprocalImplementation = getReciprocalImplementation(
      name, implementation
    );

    new Binary(name, implementation, callerType, calleeType);

    this._makeReciprocal(
      reciprocalName,
      reciprocalImplementation,
      callerType,
      calleeType
    );
  }

  _makeReciprocal (name, reciprocal, callerType, calleeType) {
    new Binary(name, reciprocal, calleeType, callerType);
  }
}
