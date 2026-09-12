import { standardize2 } from '../standard';
import type { Custom } from '../types';
import { _const, expandFn2 } from '../utils';
import { union } from './union';

/**
 * Creates a literal union schema from string, number, or boolean literal values.
 *
 * @template | Type {@linkcode Array} `T` - Tuple of literal values.
 *
 * @param values - Literal values that form the allowed literal set.
 *
 * @returns A literal custom schema of type {@linkcode Custom}.
 */
export const litterals = expandFn2(
  <const T extends (string | number | boolean)[]>(...values: T) => {
    return standardize2<Custom<T[number]>>(values[0]);
  },
  _const(union('string', 'number', 'boolean')),
);
