import { standardize2 } from "../standard";
import type { Keys, ObjectT } from "../types";
import { expandFn2 } from "../utils";
import { object } from "./object";

export const record = expandFn2(
  <const K extends Keys[], V extends ObjectT>(value: V, ...keys: K) => {
    const object = keys.reduce((acc, key) => {
      acc[key] = value;
      return acc;
    }, {} as any);

    type TT = Record<K[number] extends never ? Keys : K[number], V>;

    return standardize2<TT>(object);
  },
  object.const,
);
