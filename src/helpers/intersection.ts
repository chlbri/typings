import type { IntersectionCustom, NotReadonly, ObjectMapS } from "../types";

const intersection = <
  const T extends [ObjectMapS, ObjectMapS, ...ObjectMapS[]],
>(
  ...values: T
) => {
  const out = values.reduce((acc, curr) => {
    Object.entries(curr).forEach(([key, value]) => {
      acc[key] = value;
    });
    return acc;
  }, {} as any);

  return out as IntersectionCustom<NotReadonly<T>>;
};

export { intersection };
