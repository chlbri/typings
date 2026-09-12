import { standardize2 } from '../standard';
import type { NotReadonly, ObjectT, SoRaCustom } from '../types';

/**
 * Creates a Single-or-Recursive-Array (`SoRa`) schema representation.
 *
 * @template | Type {@linkcode ObjectT} `T` - Base element schema type.
 *
 * @param value - Optional schema definition value.
 *
 * @returns Schema accepting a single item or deeply nested arrays of items, wrapped
 *   as type {@linkcode SoRaCustom}.
 */
export const sora = <const T extends ObjectT>(value?: T) => {
  type TT = ObjectT extends NotReadonly<T> ? 'any' : SoRaCustom<NotReadonly<T>>;
  return standardize2<TT>(value);
};
