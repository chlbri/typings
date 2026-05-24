import { STANDARD_KEY } from './constants';
import type { StandardSchemaV1 } from './types';
import { type } from './type';
import type { inferT, Sh } from './types';

describe('type', () => {
  test('type — no option', () => {
    const result = type();

    expectTypeOf(result.type).toEqualTypeOf<unknown>();
    expectTypeOf(result[STANDARD_KEY].version).toEqualTypeOf<1>();

    expectTypeOf(result[STANDARD_KEY].vendor).toEqualTypeOf<string>();
  });

  test('type — direct string primitive', () => {
    const result = type('string');

    expectTypeOf(result).toEqualTypeOf<Sh<'string'>>();
    expectTypeOf(result.type).toEqualTypeOf<string>();
  });

  test('type — direct number primitive', () => {
    const result = type('number');
    expectTypeOf(result.type).toEqualTypeOf<number>();
    expectTypeOf(result.type).toEqualTypeOf<inferT<typeof result>>();
  });

  test('type — direct boolean primitive', () => {
    const result = type('boolean') satisfies Sh<'boolean'>;
    expectTypeOf(result.type).toEqualTypeOf<boolean>();
    expectTypeOf(result.type).toEqualTypeOf<inferT<typeof result>>();
  });

  test('type — direct null primitive', () => {
    const result = type('null');
    expectTypeOf(result.type).toEqualTypeOf<null>();
    expectTypeOf(result.type).toEqualTypeOf<inferT<typeof result>>();
  });

  test('type — direct undefined primitive', () => {
    expectTypeOf(type('undefined').type).toEqualTypeOf<undefined>();
  });

  test('type — direct object option', () => {
    const result = type({ name: 'string', age: 'number' });

    expectTypeOf(result.type).toEqualTypeOf<{
      name: string;
      age: number;
    }>();
  });

  test('type — empty object option', () => {
    expectTypeOf(type({}).type).toEqualTypeOf<unknown>();
  });

  test(`type — ${STANDARD_KEY}.validate return type`, () => {
    const result = type({ flag: 'boolean' });

    expectTypeOf(result[STANDARD_KEY].validate).toExtend<
      (
        value: unknown,
      ) =>
        | StandardSchemaV1.Result<{ flag: boolean }>
        | Promise<StandardSchemaV1.Result<{ flag: boolean }>>
    >();
  });

  test(`type — ${STANDARD_KEY}.types`, () => {
    const result = type({ x: 'string' });

    expectTypeOf(result[STANDARD_KEY].types?.input).toEqualTypeOf<
      { x: string } | undefined
    >();

    expectTypeOf(result[STANDARD_KEY].types?.output).toEqualTypeOf<
      { x: string } | undefined
    >();
  });
});
