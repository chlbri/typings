import type { Keys, ObjectMapS, ObjectT } from "../types";
import { expandFn } from "../utils/expandFn";

const union = <T extends [ObjectT, ObjectT, ...ObjectT[]]>(...values: T) => {
  return values[0] as T[number];
};

type Discriminated<K extends Keys> = ObjectMapS & Record<K, ObjectT>;

const fn = expandFn(union, {
  discriminated: <
    const K extends Keys,
    T extends [Discriminated<K>, Discriminated<K>, ...Discriminated<K>[]],
  >(
    _key: K,
    ...values: T
  ) => union(...values),
});

export default fn;
