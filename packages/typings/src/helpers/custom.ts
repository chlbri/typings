import { standardize2 } from '../standard';
import type { Custom, ObjectT } from '../types';
import { expandFn2 } from '../utils';

/**
 * Creates a custom schema value that bypasses standard object transformations.
 *
 * @example
 *   ```ts
 *   const myCustomValue = custom({ foo: 'bar' });
 *   ```;
 *
 * @template T - The custom value type.
 *
 * @param value - The value or validator to wrap as a custom type.
 *
 * @returns A custom schema representation of type {@linkcode Custom}.
 */
export const custom = expandFn2(<const T = any>(value?: T) => {
  type TT = ObjectT extends T ? 'any' : Custom<T>;
  return standardize2<TT>(value);
}, 'any');
