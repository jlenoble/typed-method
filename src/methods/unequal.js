import Binary from './binary';
import Symmetric from './symmetric';
import {succeed} from '../implementations';

export default class Unequal {
  constructor (name, implementation, callerType, calleeType) {
    if (callerType === calleeType || calleeType === undefined) {
      new Binary(name, implementation, callerType, calleeType);
    } else {
      new Symmetric(name, succeed, callerType, calleeType);
    }
  }
}
