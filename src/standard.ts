import { STANDARD_KEY } from './constants';
import type { StandardSchemaV1 } from './standard.types';

type Standardize_F = <T>(value: T) => {
  __type: T;
  type: T;
} & StandardSchemaV1<T, T>;

const _standardize = (__type: any) => {
  return {
    __type: __type,
    type: __type,
    [STANDARD_KEY]: {
      version: 1,
      vendor: '@bemedev/typings',
      types: {
        input: __type,
        output: __type,
      },
      validate: () => ({ value: __type }),
    },
  } as const;
};

export const standardize: Standardize_F = _standardize;
export const standardize2 = <T>(value?: unknown) => value as T;
