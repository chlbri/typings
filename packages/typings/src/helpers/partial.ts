import { standardize2 } from '../standard';
import type { NotReadonly, ObjectT, PartialCustom } from '../types';

/**
 * Marks all properties of an object schema as optional.
 *
 * @template | Type {@linkcode ObjectT} `T` - Object schema type.
 *
 * @param value - The object schema to make partial.
 *
 * @returns The partial schema wrapped as interface {@linkcode PartialCustom}.
 */
export const partial = <const T extends ObjectT>(value: T) => {
  return standardize2<PartialCustom<NotReadonly<T>>>(value);
};
