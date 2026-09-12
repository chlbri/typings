import type { SoRa } from './arrays.types';
import type { Keys } from './utilities.types';

/** Union of JSON-compatible primitive types. */
export type JSON_Primitive = string | number | boolean | undefined;

/** Union of all primitive TypeScript types supported by the library. */
export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | null
  | undefined
  | symbol
  | never;

/**
 * Represents a primitive value, primitive map, or recursive array of primitives.
 *
 * @see -- type {@linkcode SoRa}
 */
export type PrimitiveObject = SoRa<JSON_Primitive | PrimitiveObjectMap>;

/**
 * Dictionary mapping property keys to primitive objects.
 *
 * @see -- type {@linkcode PrimitiveObject}
 */
export interface PrimitiveObjectMap {
  [key: Keys]: PrimitiveObject;
}
