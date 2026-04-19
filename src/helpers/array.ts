import { ARRAY } from "../constants";
import type { ArrayCustom, ObjectT } from "../types";

const array = <T extends ObjectT>(value: T) => {
  type Out = ArrayCustom<T>;

  return { [ARRAY]: value } as Out;
};

export { array };
