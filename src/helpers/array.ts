import { standardize2 } from "../standard";
import type { ArrayCustom, ObjectT } from "../types";
import { _const, expandFn2 } from "../utils";

export const array = expandFn2(<T extends ObjectT>(value: T) => {
  return standardize2<ArrayCustom<T>>([value]);
}, _const<ArrayCustom>());
