import { standardize2 } from '../standard';
import type { Keys, ObjectT } from '../types';
import { expandFn2 } from '../utils';
import { object } from './object';

/**
 * Creates a record schema where all keys map to values of the specified schema type.
 *
 * @template | Type {@linkcode Keys} `K` - Key names for the record.
 * @template | Type {@linkcode ObjectT} `V` - Schema type of the values.
 *
 * @param value - Schema definition for record values.
 * @param keys - Variadic array of property keys.
 *
 * @returns The standardized record schema.
 */
export const record = expandFn2(
  <const K extends Keys[], V extends ObjectT>(value: V, ...keys: K) => {
    const object = keys.reduce((acc, key) => {
      acc[key] = value;
      return acc;
    }, {} as any);

    type TT = Record<K[number] extends never ? Keys : K[number], V>;

    return standardize2<TT>(object);
  },
  object.const,
);
