import { ARRAY } from '../constants';
import type { ArrayCustom, ObjectS } from '../types';

const array = <T extends ObjectS>(value: T) =>
  ({ [ARRAY]: value }) as ArrayCustom<T>;

export default array;
