import { STANDARD_KEY } from '../constants';
import type { ObjectT, Sh } from '../types';

export const isSh = <T extends ObjectT = ObjectT>(
  value: unknown,
): value is Sh<T> => {
  if (typeof value !== 'object') return false;
  if (value === null) return false;

  return (
    '__type' in value &&
    'type' in value &&
    STANDARD_KEY in value &&
    typeof value[STANDARD_KEY] === 'object' &&
    value[STANDARD_KEY] !== null &&
    'version' in value[STANDARD_KEY] &&
    typeof value[STANDARD_KEY].version === 'number' &&
    'vendor' in value[STANDARD_KEY] &&
    typeof value[STANDARD_KEY].vendor === 'string' &&
    'types' in value[STANDARD_KEY] &&
    typeof value[STANDARD_KEY].types === 'object' &&
    value[STANDARD_KEY].types !== null &&
    'input' in value[STANDARD_KEY].types &&
    'output' in value[STANDARD_KEY].types &&
    'validate' in value[STANDARD_KEY] &&
    typeof value[STANDARD_KEY].validate === 'function'
  );
};
