import { UNION } from '../constants';
import { standardize2 } from '../standard';
import type { Keys, ObjectMapS, ObjectT, UnionCustom } from '../types';
import { expandFn } from '../utils/expandFn';

const _union = <T extends [ObjectT, ObjectT, ...ObjectT[]]>(...values: T) => {
  return standardize2<UnionCustom<T>>({ [UNION]: values });
};

type Discriminated<K extends Keys> = ObjectMapS & Record<K, ObjectT>;

/**
 * Creates a union schema composed of multiple alternative schema branches.
 *
 * @template | Type {@linkcode ObjectT} `T` - Tuple of union branch schema
 *   definitions.
 *
 * @param values - Variadic array of branch schemas.
 *
 * @returns The union schema wrapped as type {@linkcode UnionCustom}.
 */
export const union = expandFn(_union, {
  /**
   * Creates a discriminated union schema based on a discriminator key.
   *
   * @template | Type {@linkcode Keys} `K` - The discriminator property key name.
   * @template `T` - Tuple of discriminated object schemas sharing key `K`.
   *
   * @param _key - The discriminator property key.
   * @param values - Variadic array of discriminated branch schemas.
   *
   * @returns The union schema wrapped as type {@linkcode UnionCustom}.
   */
  discriminated: <
    const K extends Keys,
    T extends [Discriminated<K>, Discriminated<K>, ...Discriminated<K>[]],
  >(
    _key: K,
    ...values: T
  ) => _union(...values),
});
