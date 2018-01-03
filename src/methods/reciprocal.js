import Binary from './binary';
import ReciprocalImplementation from '../implementations/reciprocal';

export default class Reciprocal {
  constructor (name, reciprocalName, implementation, callerType, calleeType) {
    new Binary(name, implementation, callerType, calleeType);

    this._makeReciprocal(
      reciprocalName,
      new ReciprocalImplementation(name, implementation).optimized,
      callerType,
      calleeType || callerType
    );
  }

  _makeReciprocal (name, reciprocal, callerType, calleeType) {
    new Binary(name, reciprocal, calleeType, callerType);
  }
}
