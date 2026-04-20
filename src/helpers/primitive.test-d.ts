import { type } from '../type';
import type { Primitive, Sh } from '../types';

const _default = type(({ primitive }) => primitive());
expectTypeOf(_default).branded.toEqualTypeOf<Sh<Primitive>>();

const _default2 = type(({ primitive }) => ({
  value: primitive(),
}));
expectTypeOf(_default2).toEqualTypeOf<
  Sh<{
    value: Primitive;
  }>
>();

const _default3 = type(({ primitive, readonly }) =>
  readonly({
    value: primitive(),
  }),
);
expectTypeOf(_default3).toEqualTypeOf<
  Sh<{
    readonly value: Primitive;
  }>
>();

const str1 = type(({ primitive }) => primitive.string());
expectTypeOf(str1).toEqualTypeOf<Sh<string>>();

const str2 = type(({ primitive }) => primitive.string('Hello World'));
expectTypeOf(str2).toEqualTypeOf<Sh<'Hello World'>>();

// primitive.string() → { value: string }
const strDefault = type(({ primitive }) => ({
  value: primitive.string(),
}));
expectTypeOf(strDefault).toEqualTypeOf<Sh<{ value: string }>>();

// primitive.string('hello') → { value: 'hello' }
const strLiteral = type(({ primitive }) => ({
  value: primitive.string('hello'),
}));
expectTypeOf(strLiteral).toEqualTypeOf<Sh<{ value: 'hello' }>>();

// primitive.number() → { value: number }
const numDefault = type(({ primitive }) => ({
  value: primitive.number(),
}));
expectTypeOf(numDefault).toEqualTypeOf<Sh<{ value: number }>>();

// primitive.number(42) → { value: 42 }
const numLiteral = type(({ primitive }) => ({
  value: primitive.number(42),
}));
expectTypeOf(numLiteral).toEqualTypeOf<Sh<{ value: 42 }>>();

// primitive.boolean() → { value: boolean }
const boolDefault = type(({ primitive }) => ({
  value: primitive.boolean(),
}));
expectTypeOf(boolDefault).toEqualTypeOf<Sh<{ value: boolean }>>();

// primitive.boolean(true) → { flag: true }
const boolLiteral = type(({ primitive }) => ({
  flag: primitive.boolean(true),
}));
expectTypeOf(boolLiteral).toEqualTypeOf<Sh<{ flag: true }>>();

// primitive.symbol() → { value: symbol }
const symbolDefault = type(({ primitive }) => ({
  value: primitive.symbol(),
}));
expectTypeOf(symbolDefault).toEqualTypeOf<Sh<{ value: symbol }>>();

// primitive.symbol(Symbol.iterator) → { key: typeof Symbol.iterator }
const symbolLiteral = type(({ primitive }) => ({
  key: primitive.symbol(Symbol.iterator),
}));
expectTypeOf(symbolLiteral).toEqualTypeOf<
  Sh<{
    key: typeof Symbol.iterator;
  }>
>();

// primitive.never() → { value: never }
const neverResult = type(({ primitive }) => ({
  value: primitive.never,
}));
expectTypeOf(neverResult).toEqualTypeOf<Sh<{ value: never }>>();

// primitive.undefined() → { value: undefined }
const undefinedResult = type(({ primitive }) => ({
  value: primitive.undefined,
}));
expectTypeOf(undefinedResult).toEqualTypeOf<Sh<{ value: undefined }>>();
