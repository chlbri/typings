import { standardize2 } from '../standard';
import type {
  IntersectionCustom,
  NotReadonly,
  ObjectMapS,
} from '../types';

export const intersection = <
  const T extends [ObjectMapS, ObjectMapS, ...ObjectMapS[]],
>(
  ...values: T
) => {
  return standardize2<IntersectionCustom<NotReadonly<T>>>(values);
};
