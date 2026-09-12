import { standardize2 } from '../standard';
import type { Keys, NOmit, NotReadonly, ObjectMapS } from '../types';
import { _const, expandFn2 } from '../utils';

/**
 * Omits specified keys from an object schema definition.
 *
 * @template | Type {@linkcode ObjectMapS} `T` - Base object schema type.
 * @template | Type {@linkcode Keys} `K` - Key names to omit.
 *
 * @param value - The base object schema.
 * @param _ - The keys to omit from the schema.
 *
 * @returns The resulting schema with specified keys omitted.
 */
export const omit = expandFn2(
  <const T extends ObjectMapS, K extends Keys>(value: T, _: K) => {
    type TT = ObjectMapS extends T ? ObjectMapS : Omit<NotReadonly<T>, K>;
    return standardize2<TT>(value);
  },
  _const<ObjectMapS>(),
  {
    /**
     * Strictly omits specified keys that are guaranteed to exist in type `T`.
     *
     * @template | Type {@linkcode ObjectMapS} `T` - Base object schema type.
     * @template `K` - Existing key names of type `T` to omit.
     *
     * @param value - The base object schema.
     * @param _ - The keys to omit.
     *
     * @returns The resulting schema typed with type {@linkcode NOmit}.
     */
    strict: <const T extends ObjectMapS, const K extends keyof T = keyof T>(
      value: T,
      _: K,
    ) => {
      type TT = ObjectMapS extends T ? ObjectMapS : NOmit<NotReadonly<T>, K>;
      return standardize2<TT>(value);
    },
  },
);
