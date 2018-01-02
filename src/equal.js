import Binary from './binary';
import Symmetric from './symmetric';
import {fail} from './implementations';

export default class Equal {
  constructor (name, implementation, callerType, calleeType) {
    if (callerType === calleeType || calleeType === undefined) {
      new Binary(name, implementation, callerType, calleeType);
    } else {
      new Symmetric(name, fail, callerType, calleeType);
    }
  }
}
