import type { __ObjectS, ArrayCustom, Maybe } from '../types';

const tuple = <
  T extends [
    __ObjectS | Maybe | ArrayCustom,
    ...(__ObjectS | Maybe | ArrayCustom)[],
  ],
>(
  ...values: T
) => values;

export default tuple;
