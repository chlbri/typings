import type { ObjectT } from "../types";

export const readonly = <const T extends ObjectT>(value: T) => value;
