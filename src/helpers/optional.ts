import { standardize2 } from '../standard';
import type { CanOptional, NotReadonly, Optional } from '../types';

export const optional = <const T extends CanOptional>(value?: T) => {
  return standardize2<Optional<NotReadonly<T>>>(value);
};
