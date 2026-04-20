import { standardize2 } from "../standard";
import type { Custom } from "../types";
import { _const, expandFn2 } from "../utils";
import { union } from "./union";

export const litterals = expandFn2(
  <const T extends (string | number | boolean)[]>(...values: T) => {
    return standardize2<Custom<T[number]>>(values[0]);
  },
  _const(union("string", "number", "boolean")),
);
