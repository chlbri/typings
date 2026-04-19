import type { NotReadonly, ObjectT } from "../types";

const any = <const T extends ObjectT = ObjectT>(value?: T) => {
  return value as ObjectT extends NotReadonly<T> ? "any" : NotReadonly<T>;
};

export { any };
