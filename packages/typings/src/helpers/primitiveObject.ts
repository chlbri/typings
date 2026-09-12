import { standardize2 } from '../standard';
import type {
  IntersectionCustom,
  NotReadonly,
  PrimitiveObjectMapS,
  PrimitiveObjectT,
} from '../types';
import { _const, expandFn2 } from '../utils';

/**
 * Creates a schema for primitive objects, recursive primitive maps, or intersections
 * thereof.
 *
 * @template | Type {@linkcode PrimitiveObjectT} `T` - Primitive object schema type.
 *
 * @param value - Optional primitive object schema definition.
 *
 * @returns The standardized primitive object schema.
 */
export const primitiveObject = expandFn2(
  <
    const T extends PrimitiveObjectT | IntersectionCustom<PrimitiveObjectMapS[]> =
      PrimitiveObjectT,
  >(
    value?: T,
  ) => {
    return standardize2<NotReadonly<T>>(value);
  },
  _const<PrimitiveObjectT>(),
  {
    /**
     * Creates an object map where all values must conform to primitive object
     * schemas.
     *
     * @template | Interface {@linkcode PrimitiveObjectMapS} `T` - Primitive object
     *   map type.
     *
     * @param value - Optional primitive object map definition.
     *
     * @returns The standardized primitive object map schema.
     */
    map: expandFn2(
      <
        const T extends
          | PrimitiveObjectMapS
          | IntersectionCustom<PrimitiveObjectMapS[]> = PrimitiveObjectMapS,
      >(
        value?: T,
      ) => {
        return standardize2<NotReadonly<T>>(value);
      },
      _const<PrimitiveObjectMapS>(),
    ),
  },
);
