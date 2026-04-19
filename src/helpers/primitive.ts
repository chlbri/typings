import type { Custom, PrimitiveT } from "../types";
import { expandFn } from "../utils/expandFn";

export const primitive = expandFn(
  <const T extends PrimitiveT>(value?: T) => value as T,
  {
    boolean: <const T extends boolean>(value?: T) => {
      type TT = boolean extends T ? "boolean" : Custom<T>;
      return value as unknown as TT;
    },

    string: <const T extends string = string>(value?: T) => {
      type TT = string extends T ? "string" : Custom<T>;
      return value as unknown as TT;
    },

    number: <const T extends number = number>(value?: T) => {
      type TT = number extends T ? "number" : Custom<T>;
      return value as unknown as TT;
    },

    bigint: <const T extends bigint = bigint>(value?: T) => {
      type TT = bigint extends T ? "bigint" : Custom<T>;
      return value as unknown as TT;
    },

    symbol: <const T extends symbol = symbol>(value?: T) => {
      type TT = symbol extends T ? "symbol" : Custom<T>;
      return value as unknown as TT;
    },

    never: (): Custom<never> => {
      return undefined as any;
    },

    undefined: (): Custom<undefined> => {
      return undefined as any;
    },
  },
);
