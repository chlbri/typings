import type {
  ARRAY,
  CUSTOM,
  MAYBE,
  PARTIAL,
  PRIMITIVES,
  PRIMITIVE_OBJECTS,
  SOA,
} from './constants';

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

export type PrimitiveS = (typeof PRIMITIVES)[number];
type TransformPrimitiveS<T extends PrimitiveS> = T extends 'string'
  ? string
  : T extends 'number'
    ? number
    : T extends 'boolean'
      ? boolean
      : T extends 'null'
        ? null
        : T extends 'undefined'
          ? undefined
          : T extends 'symbol'
            ? symbol
            : never;

export type Types = PrimitiveS | (typeof PRIMITIVE_OBJECTS)[number];

export type TransformTypes<T extends Types> = T extends PrimitiveS
  ? TransformPrimitiveS<T>
  : T extends 'date'
    ? Date
    : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      {};

export type Custom<T = any> = {
  [CUSTOM]: T;
};

export type SoaCustom<T extends ObjectS = any> = {
  [SOA]: T;
};

export type PartialCustom = {
  [PARTIAL]: undefined;
};

export type __ObjectS = Types | ObjectMapS | Custom | PartialCustom;

export type Maybe<
  T extends __ObjectS | ArrayCustom | __ObjectS[] = __ObjectS,
> = {
  [MAYBE]: T;
};

export type ArrayCustom<T extends ObjectS = any> = {
  [ARRAY]: T;
};

export type ObjectMapS = {
  [key: Keys]: SoRa<_ObjectS>;
};

type _ObjectS = __ObjectS | Maybe | ArrayCustom;

/**
 * A type that represents a primitive object, which can be a primitive value or an object
 *
 * @remark
 */
export type ObjectS = _ObjectS | SoRa<_ObjectS>;
export type POS = ObjectS;

type ReduceTuple2<T extends AnyArray<ObjectS>> = T extends [
  infer First,
  ...infer Rest extends AnyArray<ObjectS>,
]
  ? [TransformS<First>, ...ReduceTuple2<Rest>]
  : T extends AnyArray<infer A extends ObjectS>
    ? TransformS<A>[]
    : [];

type __TransformPrimitiveObject<T> = T extends Types
  ? TransformTypes<T>
  : T extends ArrayCustom<infer A>
    ? TransformS<A>[]
    : T extends SoaCustom<infer TSoA>
      ? SoA<__TransformPrimitiveObject<TSoA>>
      : T extends Custom<infer TCustom>
        ? TCustom
        : T extends AnyArray<ObjectS>
          ? ReduceTuple2<T>
          : T extends PartialCustom
            ? Partial<__TransformPrimitiveObject<NOmit<T, typeof PARTIAL>>>
            : T extends Maybe<infer TMaybe>
              ? __TransformPrimitiveObject<TMaybe> | undefined
              : {
                  [K in keyof T]: __TransformPrimitiveObject<T[K]>;
                };

type ReduceTupleU<T extends AnyArray> = T extends [
  infer First,
  ...infer Rest extends AnyArray,
]
  ? [Undefiny<First>, ...ReduceTupleU<Rest>]
  : T[number] extends never
    ? []
    : T['length'] extends 0
      ? []
      : number extends T['length']
        ? T
        : Undefiny<T[number]>[];
type HasUndefined<T> = undefined extends T ? true : false;
type UndefinyObject<T extends object> = {
  [K in keyof T as HasUndefined<T[K]> extends true ? never : K]: Undefiny<
    T[K]
  >;
} & {
  [K in keyof T as HasUndefined<T[K]> extends true ? K : never]?: Undefiny<
    Exclude<T[K], undefined>
  >;
} extends infer F
  ? {
      [K in keyof F]: F[K];
    }
  : never;

type Undefiny<T> = T extends AnyArray
  ? ReduceTupleU<T>
  : T extends Ru
    ? UndefinyObject<T>
    : T;
export type TransformS<T> = Undefiny<__TransformPrimitiveObject<T>>;

export type inferT<T extends ObjectS> = TransformS<T>;
