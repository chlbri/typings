import type { NotReadonly, ObjectT } from "../types";

const tuple = <const T extends [ObjectT, ...ObjectT[]]>(...values: T) =>
  values as NotReadonly<T>;

export { tuple };
