import { standardize2 } from '../standard';
import type { Custom, StateValue } from '../types';
import { _const, expandFn2 } from '../utils';

/**
 * Creates a schema for state values (strings or nested state value maps).
 *
 * @template | Type {@linkcode StateValue} `T` - State value definition type.
 *
 * @param value - Optional state value definition.
 *
 * @returns Standardized state value schema wrapped as type {@linkcode Custom}.
 */
export const sv = expandFn2(<const T extends StateValue = StateValue>(value?: T) => {
  type TT = StateValue extends T ? Custom<StateValue> : Custom<T>;
  return standardize2<TT>(value);
}, _const<Custom<StateValue>>());
