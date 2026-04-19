import type {
  NotReadonly,
  PrimitiveObjectMapS,
  PrimitiveObjectT,
} from "../types";
import { expandFn } from "../utils/expandFn";

const primitiveObject = expandFn(
  <const T extends PrimitiveObjectT = PrimitiveObjectT>(
    value?: T,
  ): Exclude<NotReadonly<T>, undefined> => {
    return (value || {}) as any;
  },
  {
    map: <const T extends PrimitiveObjectMapS = PrimitiveObjectMapS>(
      value?: T,
    ): Exclude<NotReadonly<T>, undefined> => {
      return (value || {}) as any;
    },
  },
);

export { primitiveObject };
