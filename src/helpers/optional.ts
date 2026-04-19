import { OPTIONAL } from "../constants";
import type { __ObjectT, AnyArray, ArrayCustom, Optional } from "../types";

const optional = <T extends __ObjectT | ArrayCustom | AnyArray<__ObjectT>>(
  value?: T,
) =>
  ({
    [OPTIONAL]: value,
  }) as Optional<T>;

export default optional;
