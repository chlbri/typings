import { PARTIAL } from "../constants";
import type { ObjectT, PartialCustom } from "../types";

const partial = <T extends ObjectT>(value: T): T & PartialCustom => {
  const entries = Object.entries(value).filter(([key]) => key !== PARTIAL);
  const out: any = {};

  entries.forEach(([key, value]) => {
    out[key] = value;
  });

  return out;
};

export { partial };
