import type {
  ARRAY,
  CUSTOM,
  OPTIONAL,
  PARTIAL,
  SOA,
  SORA,
  UNION,
} from '../constants';
import type { AnyArray } from './arrays.types';
import type { __ObjectT, ObjectMapS, ObjectT } from './typings.types';

/**
 * Internal marker type wrapper for custom types and validator outputs.
 *
 * @template T - Underlying custom type, defaults to `any`.
 */
export type Custom<T = any> = { [CUSTOM]: T };

/**
 * Internal marker type wrapper for Single-or-Array schema representations.
 *
 * @template | Type {@linkcode ObjectT} `T` - Element schema definition.
 */
export type SoaCustom<T extends ObjectT = ObjectT> = { [SOA]: T };

/**
 * Internal marker type wrapper for Single-or-Recursive-Array schema representations.
 *
 * @template | Type {@linkcode ObjectT} `T` - Element schema definition.
 */
export type SoRaCustom<T extends ObjectT = ObjectT> = { [SORA]: T };

/**
 * Internal marker type wrapper for union schemas.
 *
 * @template | Type {@linkcode Array} `T` - Tuple of union branch schemas.
 */
export type UnionCustom<T extends ObjectT[] = ObjectT[]> = { [UNION]: T };

/**
 * Internal marker interface wrapper for partial schemas.
 *
 * @template | Type {@linkcode ObjectT} `T` - Base object schema definition.
 */
export interface PartialCustom<T extends ObjectT = ObjectT> {
  [PARTIAL]: T;
}

/**
 * Internal marker type wrapper for array schemas.
 *
 * @template | Type {@linkcode ObjectT} `T` - Array element schema definition.
 */
export type ArrayCustom<T extends ObjectT = any> = { [ARRAY]: T };

/**
 * Internal marker type wrapper for optional properties.
 *
 * @template | Type {@linkcode **ObjectT} `T` - Schema definition to mark as
 *   optional.
 */
export type Optional<
  T extends __ObjectT | ArrayCustom | AnyArray<__ObjectT> = __ObjectT,
> = { [OPTIONAL]: T };

/**
 * Intersects multiple object schemas into a single unified object schema type.
 *
 * @template | Type {@linkcode Array} `T` - Array of object map schemas.
 */
export type IntersectionCustom<T extends ObjectMapS[]> = T extends [
  infer First extends ObjectMapS,
  ...infer Rest extends ObjectMapS[],
]
  ? First & IntersectionCustom<Rest>
  : unknown;
