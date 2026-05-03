import { standardize2 } from "../standard";
import type { NotReadonly, ObjectT, SoRaCustom } from "../types";

export const sora = <const T extends ObjectT>(value?: T) => {
  type TT = ObjectT extends NotReadonly<T> ? "any" : SoRaCustom<NotReadonly<T>>;
  return standardize2<TT>(value);
};
