import type { StandardSchemaV1 } from './standard.types';

type Standardize_F = <T>(value: T) => {
  value: T;
} & StandardSchemaV1<T, T>;

const _standardize = (value: any) => {
  return {
    value,
    '~standard': {
      version: 1,
      vendor: '@bemedev/typings',
      types: {
        input: value,
        output: value,
      },
      validate: () => ({ value }),
    },
  } as const;
};

export const standardize: Standardize_F = _standardize;
export const standardize2 = <T>(value?: unknown) => value as T;
