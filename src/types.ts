import type {
  ARRAY,
  CUSTOM,
  OPTIONAL,
  PARTIAL,
  PRIMITIVES,
  PRIMITIVE_OBJECTS,
  SOA,
  SORA,
  STANDARD_KEY,
  UNION,
} from './constants';
import type { StandardSchemaV1 } from './standard.types';

export type Ru = Record<Keys, unknown>;

type Equals<T, U> = T extends U ? (U extends T ? true : false) : false;

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
type TransformPrimitiveS<T extends PrimitiveT> = T extends 'string'
  ? string
  : T extends 'number'
    ? number
    : T extends 'boolean'
      ? boolean
      : T extends 'bigint'
        ? bigint
        : T extends 'null'
          ? null
          : T extends 'undefined'
            ? undefined
            : T extends 'symbol'
              ? symbol
              : T extends 'never'
                ? never
                : Primitive;

export type Types = PrimitiveT | (typeof PRIMITIVE_OBJECTS)[number];

export type TransformTypes<T extends Types> = T extends PrimitiveT
  ? TransformPrimitiveS<T>
  : T extends 'date'
    ? Date
    : T extends 'any'
      ? any
      : T extends 'unknown'
        ? unknown
        : object;

export type Custom<T = any> = {
  [CUSTOM]: T;
};

export type SoaCustom<T extends ObjectT = ObjectT> = {
  [SOA]: T;
};

export type SoRaCustom<T extends ObjectT = ObjectT> = {
  [SORA]: T;
};

export type UnionCustom<T extends ObjectT[] = ObjectT[]> = {
  [UNION]: T;
};

export interface PartialCustom<T extends ObjectT = ObjectT> {
  [PARTIAL]: T;
}

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
  readonly __NO_TYPE__ = '@bemedev/addons/NO_TYPE';
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
  | PrimitiveT
  | PrimitiveObjectMapS
  | ArrayCustom<PrimitiveT | PrimitiveObjectMapS>
  | Optional<PrimitiveT | PrimitiveObjectMapS>
  | UnionCustom<(PrimitiveObjectMapS | PrimitiveT)[]>
  | PartialCustom<PrimitiveObjectMapS>
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
  : [];

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
// #endregion

// oxlint-disable-next-line typescript/no-empty-object-type
export type EmptyObject = Record<string, never>;

type __TransformUnion<T extends UnionCustom> =
  T extends UnionCustom<infer TCustom>
    ? Omit<T, typeof UNION> extends infer Ot
      ? Equals<Ot, EmptyObject> extends true
        ? TransformT<TCustom[number]>
        : TransformT<TCustom[number]> & TransformT<Ot>
      : never
    : never;

// #region type Undefiny
type HasUndefined<T> = unknown extends T
  ? false
  : Equals<EmptyObject, T> extends true
    ? false
    : OptionalHelperClass extends T
      ? true
      : false;
type _UndefinyObject<T extends object> = {
  [K in keyof T as HasUndefined<T[K]> extends true ? never : K]: Undefiny<
    T[K]
  >;
} & {
  [K in keyof T as HasUndefined<T[K]> extends true ? K : never]?: Undefiny<
    T[K]
  >;
};

type UndefinyObject<T extends object> =
  _UndefinyObject<T> extends infer O ? { [K in keyof O]: O[K] } : never;

type Undefiny<T, U = Exclude<T, OptionalHelperClass>> = U extends AnyArray
  ? ReduceTupleU<U>
  : U extends TrueObject
    ? UndefinyObject<U>
    : U;
// #endregion

type TransformT<T> =
  Equals<ObjectMapS, T> extends true
    ? object
    : T extends Types
      ? TransformTypes<T>
      : T extends ArrayCustom<infer A>
        ? TransformT<A>[]
        : T extends UnionCustom
          ? __TransformUnion<T>
          : T extends SoRaCustom<infer TSoA>
            ? SoRa<TransformT<TSoA>>
            : T extends SoaCustom<infer TSoA>
              ? SoA<TransformT<TSoA>>
              : T extends Custom<infer TCustom>
                ? TCustom
                : T extends AnyArray<ObjectT>
                  ? ReduceTuple2<T>
                  : T extends PartialCustom<infer TPartial>
                    ? Partial<TransformT<TPartial>>
                    : T extends Optional<infer TOptional>
                      ? TransformT<TOptional> | OptionalHelperClass
                      : Undefiny<{
                          [K in keyof T]: TransformT<T[K]>;
                        }>;

export type StandardHelper<T1 = any, T2 = any> = {
  __type: T1;
  type: T2;
} & StandardSchemaV1<T2, T2>;

type _Sh<T1 = any, T2 = any> = StandardHelper<T1, T2>;
export type Sh<T extends ObjectT = ObjectT> = StandardHelper<T, inferO<T>>;
export type StandardOutput<T = any> = {
  [STANDARD_KEY]: {
    types?: {
      output: T;
    };
  };
};

export type PrimitiveObject = SoRa<Primitive | PrimitiveObjectMap>;
export interface PrimitiveObjectMap {
  [key: Keys]: PrimitiveObject;
}

export type inferO<T extends ObjectT = ObjectT> = ObjectT extends T
  ? unknown
  : PrimitiveObjectT extends T
    ? PrimitiveObject
    : T extends Optional<infer U>
      ? TransformT<U> | undefined
      : TransformT<T>;

export type inferSh<T extends ObjectT = ObjectT> = _Sh<T, inferO<T>>;
export type inferT<T extends StandardOutput = StandardOutput> = Exclude<
  T[typeof STANDARD_KEY]['types'],
  undefined
>['output'];

export type ProduceObject<T extends ObjectT = ObjectT> = T;

export type FnBasic<Main extends Fn, Tr extends object> = Tr & Main;

type ReduceTupleSafePre<T extends ReadonlyArray<ObjectT>> =
  T extends readonly [
    infer First extends ObjectT,
    ...infer Rest extends ReadonlyArray<ObjectT>,
  ]
    ? readonly [SafePre<First>, ...ReduceTupleSafePre<Rest>]
    : [];

type _SafePre<T extends ObjectT> = PrimitiveObjectT extends T
  ? PrimitiveObjectT
  : PrimitiveT extends T
    ? PrimitiveT
    : T extends Types
      ? T
      : T extends PartialCustom<infer TPartial>
        ? Partial<SafePre<TPartial>>
        : T extends ArrayCustom<infer A>
          ? SafePre<A>[]
          : T extends Optional<infer TOptional>
            ? SafePre<TOptional> | undefined
            : T extends SoRaCustom<infer TSoRa>
              ? SoRa<SafePre<TSoRa>>
              : T extends SoaCustom<infer TSoA>
                ? SoA<SafePre<TSoA>>
                : T extends Custom
                  ? T
                  : T extends AnyArray<ObjectT>
                    ? ReduceTupleSafePre<T>
                    : PrimitiveObjectMapS extends T
                      ? PrimitiveObjectMapS
                      : ObjectMapS extends T
                        ? ObjectMapS
                        : T extends ObjectMapS
                          ? { [K in keyof T]: SafePre<T[K]> }
                          : T;
export type SafePre<T extends ObjectT> = Extract<_SafePre<T>, ObjectT>;

export * from './standard.types';
