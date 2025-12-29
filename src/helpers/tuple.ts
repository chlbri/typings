import type { __ObjectS, ArrayCustom, NotReadonly, Maybe } from '../types';

const tuple = <
  const T extends [
    __ObjectS | Maybe | ArrayCustom,
    __ObjectS | Maybe | ArrayCustom,
    ...(__ObjectS | Maybe | ArrayCustom)[],
  ],
>(
  ...values: T
) => values as NotReadonly<T>;

export default tuple;
