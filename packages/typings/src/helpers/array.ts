import { standardize2 } from '../standard';
import type { ArrayCustom, NotReadonly, ObjectT } from '../types';
import { _const, expandFn2 } from '../utils';

/**
 * Creates an array schema definition for the provided element schema type.
 *
 * @template | Type {@linkcode ObjectT} `T` - Element schema type.
 *
 * @param value - The schema definition for the array items.
 *
 * @returns An array schema wrapped as type {@linkcode ArrayCustom}.
 */
export const array = expandFn2(<const T extends ObjectT>(value: T) => {
  return standardize2<ArrayCustom<NotReadonly<T>>>([value]);
}, _const<ArrayCustom>());
