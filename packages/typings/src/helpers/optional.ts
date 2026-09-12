import { standardize2 } from '../standard';
import type {
  __ObjectT,
  AnyArray,
  ArrayCustom,
  NotReadonly,
  Optional,
} from '../types';

export type CanOptional = __ObjectT | ArrayCustom | AnyArray<__ObjectT>;
export const optional = <const T extends CanOptional>(value?: T) => {
  return standardize2<Optional<NotReadonly<T>>>(value);
};
