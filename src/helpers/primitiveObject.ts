import { standardize2 } from "../standard";
import type {
  IntersectionCustom,
  NotReadonly,
  PrimitiveObjectMapS,
  PrimitiveObjectT,
} from "../types";
import { _const, expandFn2 } from "../utils";

export const primitiveObject = expandFn2(
  <
    const T extends
      | PrimitiveObjectT
      | IntersectionCustom<PrimitiveObjectMapS[]> = PrimitiveObjectT,
  >(
    value?: T,
  ) => {
    return standardize2<NotReadonly<T>>(value);
  },
  _const<PrimitiveObjectT>(),
  {
    map: expandFn2(
      <
        const T extends
          | PrimitiveObjectMapS
          | IntersectionCustom<PrimitiveObjectMapS[]> = PrimitiveObjectMapS,
      >(
        value?: T,
      ) => {
        return standardize2<NotReadonly<T>>(value);
      },
      _const<PrimitiveObjectMapS>(),
    ),
  },
);
