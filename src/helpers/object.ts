import { standardize2 } from "../standard";
import type { NotReadonly, ObjectMapS } from "../types";
import { _const, expandFn2 } from "../utils";

export const object = expandFn2(<const T extends ObjectMapS>(value?: T) => {
  type TT = ObjectMapS extends NotReadonly<T> ? ObjectMapS : NotReadonly<T>;
  return standardize2<TT>(value);
}, _const<ObjectMapS>());
