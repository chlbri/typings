import type { Primitive } from './types.types';

export type Keys = keyof any;

export type Ru = Record<Keys, unknown>;

export type Equals<T, U> = T extends U
  ? U extends T
    ? true
    : false
  : false;

export type TrueObject = Ru & {
  [Symbol.iterator]?: never;
  //@ts-expect-error - 'SymbolConstructor' does not exist on type 'object'
  [SymbolConstructor]?: never;
};

export type Fn<Args extends any[] = any[], R = any> = (...args: Args) => R;

export type NOmit<T, K extends keyof T> = Omit<T, K>;

// #region StateValue
export type StateValue = string | StateValueMap;
interface StateValueMap {
  [key: string]: StateValue;
}
// #endregion

export type FnBasic<Main extends Fn, Tr extends object> = Tr & Main;

export type EmptyObject = Record<string, never>;

type ReduceArraySimple<T extends any[]> = T extends [
  infer First,
  ...infer Rest extends any[],
]
  ? [Simplify<First>, ...ReduceArraySimple<Rest>]
  : number extends T['length']
    ? Simplify<T[number]>[]
    : T;

export type Simplify<T> = unknown extends T
  ? T
  : T extends Primitive
    ? T
    : T extends any[]
      ? ReduceArraySimple<T>
      : T extends TrueObject
        ? { [K in keyof T]: Simplify<T[K]> }
        : T & {};
