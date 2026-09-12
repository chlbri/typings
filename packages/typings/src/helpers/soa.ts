import { standardize2 } from '../standard';
import type { NotReadonly, ObjectT, SoaCustom } from '../types';

/**
 * Creates a Single-or-Array (`SoA`) schema representation.
 *
 * @template | Type {@linkcode ObjectT} `T` - Base element schema type.
 *
 * @param value - Optional schema definition value.
 *
 * @returns Schema accepting either a single item or an array of items, wrapped as
 *   type {@linkcode SoaCustom}.
 */
export const soa = <const T extends ObjectT>(value?: T) => {
  type TT = ObjectT extends NotReadonly<T> ? 'any' : SoaCustom<NotReadonly<T>>;
  return standardize2<TT>(value);
};
