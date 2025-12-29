import type { Custom } from '../types';

const litterals = <const T extends (string | number | boolean)[]>(
  ...values: T
) => values[0] as unknown as Custom<T[number]>;

export default litterals;
