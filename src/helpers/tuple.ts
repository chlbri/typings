import { standardize2 } from "../standard";
import type { NotReadonly, ObjectT } from "../types";
import { expandFn2 } from "../utils";
import { array } from "./array";

export const tuple = expandFn2(
  <const T extends [ObjectT, ...ObjectT[]]>(...values: T) => {
    return standardize2<NotReadonly<T>>(values);
  },
  array.type,
);
