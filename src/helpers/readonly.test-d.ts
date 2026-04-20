import { type } from '../type';
import type { Sh, SoA } from '../types';
import { litterals } from './litterals';

const rd1 = type(({ readonly }) =>
  readonly({
    readonly: 'string',
  }),
);
expectTypeOf(rd1).toEqualTypeOf<
  Sh<{
    readonly readonly: string;
  }>
>();

const rd2 = type(({ readonly, array }) => ({
  readonlyArray: readonly(array('number')),
}));
const _rd2 = type(({ array }) => ({
  readonlyArray: array('number'),
}));
expectTypeOf(rd2).toEqualTypeOf(_rd2);

const rd3 = type(({ readonly, tuple }) =>
  readonly(tuple('string', 'number')),
);
const _rd3 = type(({ tuple }) => tuple('string', 'number'));
expectTypeOf(rd3).toEqualTypeOf(_rd3);

const rd4 = type(({ readonly, optional, soa, litterals, any }) =>
  readonly({
    name: 'string',
    nickname: optional('string'),
    tags: soa('string'),
    status: litterals('active', 'inactive'),
    metadata: any({
      createdAt: 'date',
      updatedAt: 'date',
    }),
    readonlyData: readonly({
      createdAt: 'date',
      updatedAt: 'date',
      tags: soa('string'),
    }),
    maybeReadonlyData1: readonly(
      any({
        createdAt: 'date',
        updatedAt: 'date',
        tags: soa('string'),
      }),
    ),
    maybeReadonlyData2: any(
      readonly({
        createdAt: 'date',
        updatedAt: 'date',
        tags: soa('string'),
      }),
    ),
  }),
);
expectTypeOf(rd4).toEqualTypeOf<
  Sh<{
    readonly name: string;
    readonly tags: SoA<string>;
    readonly status: 'active' | 'inactive';
    readonly metadata: {
      createdAt: Date;
      updatedAt: Date;
    };
    readonly readonlyData: {
      readonly createdAt: Date;
      readonly updatedAt: Date;
      readonly tags: string | string[] | readonly string[];
    };
    readonly maybeReadonlyData1: {
      createdAt: Date;
      updatedAt: Date;
      tags: string | string[] | readonly string[];
    };
    readonly maybeReadonlyData2: {
      createdAt: Date;
      updatedAt: Date;
      tags: string | string[] | readonly string[];
    };
    readonly nickname?: string | undefined;
  }>
>();

const rd5 = type(({ readonly, union }) =>
  union.discriminated(
    'type',

    readonly({
      a: { value: 'string' },
      b: { value: 'number' },
      type: litterals('a'),
    }),

    readonly({ type: litterals('b'), value: 'number' }),
  ),
);
expectTypeOf(rd5).toEqualTypeOf<
  Sh<
    | {
        readonly a: {
          readonly value: string;
        };
        readonly b: {
          readonly value: number;
        };
        readonly type: 'a';
      }
    | {
        readonly type: 'b';
        readonly value: number;
      }
  >
>();
