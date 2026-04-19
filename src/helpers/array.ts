import { ARRAY } from "../constants";
import type { ArrayCustom, NotReadonly, ObjectT } from "../types";

const array = <const T extends ObjectT>(value: T) => {
  type Out = ArrayCustom<Extract<NotReadonly<T>, ObjectT>>;

  return { [ARRAY]: value } as Out;
};

export { array };
