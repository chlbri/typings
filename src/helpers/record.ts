import type { Keys, ObjectT } from "../types";

const record = <const K extends Keys[], V extends ObjectT>(
  value: V,
  ...keys: K
) => {
  const object = keys.reduce((acc, key) => {
    acc[key] = value;
    return acc;
  }, {} as any);

  return object as Record<K[number] extends never ? Keys : K[number], V>;
};

export default record;
