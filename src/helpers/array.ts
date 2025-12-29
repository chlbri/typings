import { ARRAY } from '../constants';
import type { ArrayCustom, NotReadonly, ObjectS } from '../types';

const array = <const T extends ObjectS>(value: T) => {
  type Out = ArrayCustom<Extract<NotReadonly<T>, ObjectS>>;

  return { [ARRAY]: value } as Out;
};

export default array;
