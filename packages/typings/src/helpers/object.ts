import { standardize2 } from '../standard';
import type { NotReadonly, ObjectMapS } from '../types';
import { _const, expandFn2 } from '../utils';

/**
 * Creates an object schema definition or standardizes an object map.
 *
 * @template | Type {@linkcode ObjectMapS} `T` - Object map schema definition type.
 *
 * @param value - Optional object schema definition map.
 *
 * @returns Standardized object schema definition of type {@linkcode ObjectMapS} or
 *   type {@linkcode NotReadonly}.
 */
export const object = expandFn2(<const T extends ObjectMapS>(value?: T) => {
  type TT = ObjectMapS extends T ? ObjectMapS : NotReadonly<T>;
  return standardize2<TT>(value);
}, _const<ObjectMapS>());
