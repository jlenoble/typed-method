import Binary from './binary';
import Reciprocal from './reciprocal';

export default class Symmetric extends Reciprocal {
  constructor (name, implementation, callerType, calleeType) {
    super(name, name, implementation, callerType, calleeType);
  }

  _makeReciprocal (name, symmetric, callerType, calleeType) {
    if (callerType !== calleeType) {
      new Binary(name, symmetric, calleeType, callerType);
    }
  }
}
