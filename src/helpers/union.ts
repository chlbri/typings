import { UNION } from "../constants";
import { standardize2 } from "../standard";
import type { Keys, ObjectMapS, ObjectT } from "../types";
import { expandFn } from "../utils/expandFn";

const _union = <T extends [ObjectT, ObjectT, ...ObjectT[]]>(...values: T) => {
  return standardize2<T[number]>({ [UNION]: values });
};

type Discriminated<K extends Keys> = ObjectMapS & Record<K, ObjectT>;

export const union = expandFn(_union, {
  discriminated: <
    const K extends Keys,
    T extends [Discriminated<K>, Discriminated<K>, ...Discriminated<K>[]],
  >(
    _key: K,
    ...values: T
  ) => _union(...values),
});
