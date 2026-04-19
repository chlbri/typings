import { SOA } from "../constants";
import type { NotReadonly, ObjectT, SoaCustom } from "../types";

const soa = <const T extends ObjectT>(value: T) => {
  return { [SOA]: value } as SoaCustom<NotReadonly<T>>;
};

export { soa };
