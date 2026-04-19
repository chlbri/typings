import { SOA } from "../constants";
import type { NotReadonly, ObjectT, SoaCustom } from "../types";

const soa = <const T extends ObjectT>(value: T) => {
  type Out = SoaCustom<Extract<NotReadonly<T>, ObjectT>>;
  return { [SOA]: value } as Out;
};

export default soa;
