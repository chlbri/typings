import { PARTIAL } from "../constants";
import type { NotReadonly, ObjectT, PartialCustom } from "../types";

const partial = <const T extends ObjectT>(
  value: T,
): NotReadonly<T> & PartialCustom => {
  const entries = Object.entries(value).filter(([key]) => key !== PARTIAL);
  const out: any = {};

  entries.forEach(([key, value]) => {
    out[key] = value;
  });

  return out;
};

export { partial };
