import type {
  __ObjectS,
  ArrayCustom,
  NotReadonly,
  Optional,
} from '../types';

const tuple = <
  const T extends [
    __ObjectS | Optional | ArrayCustom,
    __ObjectS | Optional | ArrayCustom,
    ...(__ObjectS | Optional | ArrayCustom)[],
  ],
>(
  ...values: T
) => values as NotReadonly<T>;

export default tuple;
