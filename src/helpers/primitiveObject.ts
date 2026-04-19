import type {
  IntersectionCustom,
  NotReadonly,
  PrimitiveObjectMapS,
  PrimitiveObjectT,
} from "../types";
import { expandFn } from "../utils/expandFn";

const primitiveObject = expandFn(
  <
    const T extends
      | PrimitiveObjectT
      | IntersectionCustom<PrimitiveObjectMapS[]> = PrimitiveObjectT,
  >(
    value?: T,
  ): NotReadonly<T> => {
    return (value || {}) as any;
  },
  {
    map: <
      const T extends
        | PrimitiveObjectMapS
        | IntersectionCustom<PrimitiveObjectMapS[]> = PrimitiveObjectMapS,
    >(
      value?: T,
    ): NotReadonly<T> => {
      return (value || {}) as any;
    },
  },
);

export { primitiveObject };
