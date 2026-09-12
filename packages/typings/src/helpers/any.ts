import { standardize2 } from '../standard';
import type { NotReadonly, ObjectT } from '../types';
import { expandFn2 } from '../utils';

/**
 * Creates an `any` type schema or wraps a provided schema value with `any` fallback.
 *
 * @template | Type {@linkcode ObjectT} `T` - Input schema type.
 *
 * @param value - Optional schema definition.
 *
 * @returns Standardized schema resolving to `any` or type {@linkcode NotReadonly}.
 */
export const any = expandFn2(<const T extends ObjectT = ObjectT>(value?: T) => {
  type TT = ObjectT extends T ? 'any' : NotReadonly<T>;
  return standardize2<TT>(value);
}, 'any');
