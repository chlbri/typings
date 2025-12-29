import type { ObjectMapS } from '../types';

type _IntersectionCustom<T extends ObjectMapS[]> = T extends [
  infer First extends ObjectMapS,
  ...infer Rest extends ObjectMapS[],
]
  ? First & IntersectionCustom<Rest>
  : unknown;

export type IntersectionCustom<T extends ObjectMapS[]> =
  _IntersectionCustom<T> extends infer R
    ? {
        [K in keyof R]: R[K];
      }
    : never;

const intersection = <T extends [ObjectMapS, ObjectMapS, ...ObjectMapS[]]>(
  ...values: T
) => {
  const out = values.reduce((acc, curr) => {
    Object.entries(curr).forEach(([key, value]) => {
      acc[key] = value;
    });
    return acc;
  }, {} as any);
  return out as IntersectionCustom<T>;
};

export default intersection;
