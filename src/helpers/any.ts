import type { ObjectT } from "../types";

const any = <T extends ObjectT = ObjectT>(value?: T) =>
  value as ObjectT extends T ? "any" : T;
export default any;
