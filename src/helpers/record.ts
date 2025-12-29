import type { Keys, ObjectS } from '../types';

const record = <const K extends Keys[], V extends ObjectS>(
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
