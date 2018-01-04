import ReciprocalImplementation from './reciprocal';
import NegateImplementation from './negate';
import StricterImplementation from './stricter';
import LooserImplementation from './looser';

export {ReciprocalImplementation, NegateImplementation, StricterImplementation,
  LooserImplementation};

export {succeed, fail} from './functions';
export {hasImplementation, setImplementation, getImplementation, getOptimized}
  from './implementation';
