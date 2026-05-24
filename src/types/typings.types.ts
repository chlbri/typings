import type {
  JSON_PRIMITIVES,
  PRIMITIVE_OBJECTS,
  PRIMITIVES,
} from '../constants';
import type { SoRa } from './arrays.types';
import type {
  ArrayCustom,
  Custom,
  Optional,
  PartialCustom,
  UnionCustom,
} from './customs.types';
import type { Keys } from './utilities.types';

export type JSON_PrimitiveT = (typeof JSON_PRIMITIVES)[number];
export type PrimitiveT = (typeof PRIMITIVES)[number];
export type Types = PrimitiveT | (typeof PRIMITIVE_OBJECTS)[number];

export type PrimitiveObjectT = SoRa<
  | JSON_PrimitiveT
  | PrimitiveObjectMapS
  | ArrayCustom<JSON_PrimitiveT | PrimitiveObjectMapS>
  | Optional<JSON_PrimitiveT | PrimitiveObjectMapS>
  | UnionCustom<(PrimitiveObjectMapS | JSON_PrimitiveT)[]>
  | PartialCustom<PrimitiveObjectMapS>
>;

export interface PrimitiveObjectMapS {
  [key: Keys]: PrimitiveObjectT;
}

export type __ObjectT =
  | Types
  | ObjectMapS
  | Custom
  | PartialCustom
  | PrimitiveObjectT;

type _ObjectT = __ObjectT | Optional | ArrayCustom;

export type ObjectMapS = {
  [key: Keys]: SoRa<_ObjectT>;
};

/**
 * A type that represents a primitive object, which can be a primitive value or an object
 *
 * @remark
 */
export type ObjectT = SoRa<_ObjectT>;
export type POS = ObjectT;
