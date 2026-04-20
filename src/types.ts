import type {
  ARRAY,
  CUSTOM,
  OPTIONAL,
  PARTIAL,
  PRIMITIVES,
  PRIMITIVE_OBJECTS,
  SOA,
} from "./constants";
import type { StandardSchemaV1 } from "./standard.types";

export type Ru = Record<Keys, unknown>;

export type TrueObject = Ru & {
  [Symbol.iterator]?: never;
  //@ts-expect-error - 'SymbolConstructor' does not exist on type 'object'
  [SymbolConstructor]?: never;
};

export type Fn<Args extends any[] = any[], R = any> = (...args: Args) => R;

type ReduceTuple<T extends AnyArray> = T extends [
  infer First,
  ...infer Rest extends AnyArray,
]
  ? [NotReadonly<First>, ...ReduceTuple<Rest>]
  : T extends AnyArray<infer A>
    ? NotReadonly<A>[]
    : [];

export type NotReadonly<T> = T extends AnyArray
  ? ReduceTuple<T>
  : T extends object
    ? {
        -readonly [P in keyof T]: T[P] extends Fn
          ? T[P]
          : T[P] extends TrueObject
            ? NotReadonly<T[P]>
            : T[P];
      }
    : T;

export type AnyArray<T = unknown> = ReadonlyArray<T> | T[];
export type Keys = keyof any;
export type NOmit<T, K extends keyof T> = Omit<T, K>;
export type SingleOrArray<T> = T | T[] | ReadonlyArray<T>;
export type SoA<T> = SingleOrArray<T>;

// #region StateValue
export type StateValue = string | StateValueMap;
interface StateValueMap {
  [key: string]: StateValue;
}
// #endregion

// #region SoRa
type RecursiveArrayOf<T> =
  | Array<_SingleOrRecursiveArrayOf<T>>
  | ReadonlyArray<_SingleOrRecursiveArrayOf<T>>;

type _SingleOrRecursiveArrayOf<T> = T | RecursiveArrayOf<T>;
export type SingleOrRecursiveArrayOf<T> = T | RecursiveArrayOf<T>;

export type SoRa<T> = SingleOrRecursiveArrayOf<T>;
// #endregion
export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | null
  | undefined
  | symbol
  | never;

export type PrimitiveT = (typeof PRIMITIVES)[number];
type TransformPrimitiveS<T extends PrimitiveT> = T extends "string"
  ? string
  : T extends "number"
    ? number
    : T extends "boolean"
      ? boolean
      : T extends "bigint"
        ? bigint
        : T extends "null"
          ? null
          : T extends "undefined"
            ? undefined
            : T extends "symbol"
              ? symbol
              : T extends "never"
                ? never
                : Primitive;

export type Types = PrimitiveT | (typeof PRIMITIVE_OBJECTS)[number];

export type TransformTypes<T extends Types> = T extends PrimitiveT
  ? TransformPrimitiveS<T>
  : T extends "date"
    ? Date
    : T extends "any"
      ? any
      : T extends "unknown"
        ? unknown
        : object;

export type Custom<T = any> = {
  [CUSTOM]: T;
};

export type SoaCustom<T extends ObjectT = any> = {
  [SOA]: T;
};

export type PartialCustom = {
  [PARTIAL]: undefined;
};

export type __ObjectT =
  | Types
  | ObjectMapS
  | Custom
  | PartialCustom
  | PrimitiveObjectT;

export type CanOptional = __ObjectT | ArrayCustom | AnyArray<__ObjectT>;

export type Optional<
  T extends __ObjectT | ArrayCustom | AnyArray<__ObjectT> = __ObjectT,
> = {
  [OPTIONAL]: T;
};

export type ArrayCustom<T extends ObjectT = any> = {
  [ARRAY]: T;
};

export type ObjectMapS = {
  [key: Keys]: SoRa<_ObjectT>;
};

class OptionalHelperClass {
  readonly __NO_TYPE__ = "@bemedev/addons/NO_TYPE";
  private constructor() {}
}

export type IntersectionCustom<T extends ObjectMapS[]> = T extends [
  infer First extends ObjectMapS,
  ...infer Rest extends ObjectMapS[],
]
  ? First & IntersectionCustom<Rest>
  : unknown;

type _ObjectT = __ObjectT | Optional | ArrayCustom;

export type PrimitiveObjectT = SoRa<
  | Types
  | ArrayCustom<Types>
  | Optional<Types>
  | PrimitiveObjectMapS
  | (PrimitiveObjectMapS & PartialCustom)
>;

export interface PrimitiveObjectMapS {
  [key: Keys]: PrimitiveObjectT;
}

/**
 * A type that represents a primitive object, which can be a primitive value or an object
 *
 * @remark
 */
export type ObjectT = SoRa<_ObjectT>;
export type POS = ObjectT;

// #region tuple helpers
type ReduceTuple2<T extends AnyArray<ObjectT>> = T extends [
  infer First,
  ...infer Rest extends AnyArray<ObjectT>,
]
  ? [TransformT<First>, ...ReduceTuple2<Rest>]
  : T extends AnyArray<infer A extends ObjectT>
    ? TransformT<A>[]
    : [];

type ReduceTupleU<T extends AnyArray> = T extends [
  infer First,
  ...infer Rest extends AnyArray,
]
  ? [Undefiny<First>, ...ReduceTupleU<Rest>]
  : T[number] extends never
    ? []
    : T["length"] extends 0
      ? []
      : number extends T["length"]
        ? T
        : Undefiny<T[number]>[];
// #endregion

type __TransformPrimitiveObject<T> = T extends Types
  ? TransformTypes<T>
  : T extends ArrayCustom<infer A>
    ? TransformT<A>[]
    : T extends SoaCustom<infer TSoA>
      ? SoA<__TransformPrimitiveObject<TSoA>>
      : T extends Custom<infer TCustom>
        ? TCustom
        : T extends AnyArray<ObjectT>
          ? ReduceTuple2<T>
          : T extends PartialCustom
            ? Partial<__TransformPrimitiveObject<NOmit<T, typeof PARTIAL>>>
            : T extends Optional<infer TOptional>
              ? __TransformPrimitiveObject<TOptional> | OptionalHelperClass
              : {
                  [K in keyof T]: __TransformPrimitiveObject<T[K]>;
                };

// #region type Undefiny
type HasUndefined<T> = unknown extends T
  ? false
  : OptionalHelperClass extends T
    ? true
    : false;
type UndefinyObject<T extends object> = {
  [K in keyof T as HasUndefined<T[K]> extends true ? never : K]: Undefiny<T[K]>;
} & {
  [K in keyof T as HasUndefined<T[K]> extends true ? K : never]?: Undefiny<
    T[K]
  >;
} extends infer F
  ? {
      [K in keyof F]: F[K];
    }
  : never;

type Undefiny<T, U = Exclude<T, OptionalHelperClass>> = U extends AnyArray
  ? ReduceTupleU<U>
  : U extends Ru
    ? UndefinyObject<U>
    : U;
// #endregion

type TransformT<T> = Undefiny<__TransformPrimitiveObject<T>>;
export type StandardHelper<T = any> = { value: T } & StandardSchemaV1<T, T>;

export type Sh<T = any> = StandardHelper<T>;
export type StandardOutput<T> = StandardSchemaV1<any, T>;

export type inferO<T extends ObjectT = ObjectT> = ObjectT extends T
  ? unknown
  : TransformT<T>;

export type inferSh<T extends ObjectT = ObjectT> = Sh<inferO<T>>;
export type inferT<T extends Sh> = T["value"];
export type ProduceObject<T extends ObjectT = ObjectT> = T;

export type FnBasic<Main extends Fn, Tr extends object> = Tr & Main;
