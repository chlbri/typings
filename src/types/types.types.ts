import type { SoRa } from './arrays.types';
import type { Keys } from './utilities.types';

export type JSON_Primitive = string | number | boolean | undefined;

export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | null
  | undefined
  | symbol
  | never;

export type PrimitiveObject = SoRa<JSON_Primitive | PrimitiveObjectMap>;
export interface PrimitiveObjectMap {
  [key: Keys]: PrimitiveObject;
}
