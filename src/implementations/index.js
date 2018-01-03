import ReciprocalImplementation from './reciprocal';
import NegateImplementation from './negate';
import StricterImplementation from './stricter';

export {ReciprocalImplementation, NegateImplementation, StricterImplementation};

export {succeed, fail} from './functions';
export {hasImplementation, setImplementation, getImplementation, getOptimized}
  from './implementation';
