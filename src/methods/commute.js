import Binary from './binary';

export default class Commute {
  constructor (name, implementation, callerType, calleeType) {
    new Binary(name, implementation, callerType, calleeType);

    if (callerType !== calleeType && calleeType !== undefined) {
      new Binary(
        name,
        implementation,
        calleeType,
        callerType
      );
    }
  }
}
