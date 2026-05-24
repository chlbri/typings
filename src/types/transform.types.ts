import type { UNION } from '../constants';
import type { AnyArray, ReduceTuple2, SoA, SoRa } from './arrays.types';
import type {
  ArrayCustom,
  Custom,
  Optional,
  PartialCustom,
  SoaCustom,
  SoRaCustom,
  UnionCustom,
} from './customs.types';
import type {
  JSON_Primitive,
  Primitive,
  PrimitiveObject,
} from './types.types';
import type {
  ObjectMapS,
  ObjectT,
  PrimitiveObjectMapS,
  PrimitiveObjectT,
  PrimitiveT,
  Types,
} from './typings.types';
import type { OptionalHelperClass, Undefiny } from './undefiny';
import type { EmptyObject, Equals } from './utilities.types';

type __TransformUnion<T extends UnionCustom> =
  T extends UnionCustom<infer TCustom>
    ? Omit<T, typeof UNION> extends infer Ot
      ? Equals<Ot, EmptyObject> extends true
        ? TransformT<TCustom[number]>
        : TransformT<TCustom[number]> & TransformT<Ot>
      : never
    : never;

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
                : T extends 'json'
                  ? JSON_Primitive
                  : Primitive;

export type TransformTypes<T extends Types> = T extends PrimitiveT
  ? TransformPrimitiveS<T>
  : T extends 'date'
    ? Date
    : T extends 'any'
      ? any
      : T extends 'unknown'
        ? unknown
        : object;

export type TransformT<T> =
  Equals<EmptyObject, T> extends true
    ? EmptyObject
    : Equals<ObjectMapS, T> extends true
      ? object
      : PrimitiveObjectT extends T
        ? PrimitiveObject
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
        ? Partial<_SafePre<TPartial>>
        : T extends ArrayCustom<infer A>
          ? _SafePre<A>[]
          : T extends Optional<infer TOptional>
            ? _SafePre<TOptional> | undefined
            : T extends SoRaCustom<infer TSoRa>
              ? SoRa<_SafePre<TSoRa>>
              : T extends SoaCustom<infer TSoA>
                ? SoA<_SafePre<TSoA>>
                : T extends Custom
                  ? T
                  : T extends AnyArray<ObjectT>
                    ? ReduceTupleSafePre<T>
                    : PrimitiveObjectMapS extends T
                      ? PrimitiveObjectMapS
                      : ObjectMapS extends T
                        ? ObjectMapS
                        : {
                            [K in keyof T]: T[K] extends infer Tk extends
                              ObjectT
                              ? _SafePre<Tk>
                              : T[K];
                          };
export type SafePre<T extends ObjectT> = Extract<_SafePre<T>, ObjectT>;
