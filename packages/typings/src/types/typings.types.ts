import type { JSON_PRIMITIVES, PRIMITIVE_OBJECTS, PRIMITIVES } from '../constants';
import type { SoRa } from './arrays.types';
import type {
  ArrayCustom,
  Custom,
  Optional,
  PartialCustom,
  UnionCustom,
} from './customs.types';
import type { JSON_Primitive } from './types.types';
import type { Keys } from './utilities.types';

/** String literal union of all JSON-compatible primitive type names. */
export type JSON_PrimitiveT = (typeof JSON_PRIMITIVES)[number];

/** String literal union of all primitive type names. */
export type PrimitiveT = (typeof PRIMITIVES)[number];

/** String literal union of all primitive and primitive-object type names. */
export type Types = PrimitiveT | (typeof PRIMITIVE_OBJECTS)[number];

/**
 * Schema definition type representing a primitive object or recursive map thereof.
 *
 * @see -- type {@linkcode SoRa}
 */
export type PrimitiveObjectT = SoRa<
  | JSON_PrimitiveT
  | PrimitiveObjectMapS
  | ArrayCustom<JSON_PrimitiveT | PrimitiveObjectMapS>
  | Optional<JSON_PrimitiveT | PrimitiveObjectMapS>
  | UnionCustom<(PrimitiveObjectMapS | JSON_PrimitiveT)[]>
  | PartialCustom<PrimitiveObjectMapS>
  | Custom<Exclude<JSON_Primitive, undefined>>
>;

/**
 * Interface representing a dictionary map of primitive object schemas.
 *
 * @see -- type {@linkcode PrimitiveObjectT}
 */
export interface PrimitiveObjectMapS {
  [key: Keys]: PrimitiveObjectT;
}

/** Core schema union representing all primitive, map, custom, and partial types. */
export type __ObjectT =
  | Types
  | ObjectMapS
  | Custom
  | PartialCustom
  | PrimitiveObjectT;

type _ObjectT = __ObjectT | Optional | ArrayCustom;

/**
 * Schema mapping object keys to schema definitions or recursive arrays thereof.
 *
 * @see -- type {@linkcode Keys}
 */
export type ObjectMapS = { [key: Keys]: SoRa<_ObjectT> };

/**
 * Universal schema definition type representing any valid schema node.
 *
 * @see -- type {@linkcode SoRa}
 */
export type ObjectT = SoRa<_ObjectT>;

/** Alias for type {@linkcode ObjectT}. */
export type POS = ObjectT;
