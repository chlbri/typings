import { standardize2 } from '../standard';
import type {
  __ObjectT,
  AnyArray,
  ArrayCustom,
  NotReadonly,
  Optional,
} from '../types';

/** Union of schema types that can be wrapped in an optional modifier. */
export type CanOptional = __ObjectT | ArrayCustom | AnyArray<__ObjectT>;

/**
 * Marks a schema property definition as optional.
 *
 * @template | Type {@linkcode CanOptional} `T` - The schema type to mark as
 *   optional.
 *
 * @param value - Optional schema definition value.
 *
 * @returns The wrapped schema of type {@linkcode Optional}.
 */
export const optional = <const T extends CanOptional>(value?: T) => {
  return standardize2<Optional<NotReadonly<T>>>(value);
};
