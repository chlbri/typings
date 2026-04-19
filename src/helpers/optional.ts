import { OPTIONAL } from "../constants";
import type {
  __ObjectT,
  AnyArray,
  ArrayCustom,
  NotReadonly,
  Optional,
} from "../types";

const optional = <
  const T extends __ObjectT | ArrayCustom | AnyArray<__ObjectT>,
>(
  value?: T,
) =>
  ({
    [OPTIONAL]: value,
  }) as Optional<NotReadonly<T>>;

export { optional };
