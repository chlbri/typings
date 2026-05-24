import { type } from '../type';
import type { Primitive } from '../types';

const _default = type(({ primitive }) => primitive());
expectTypeOf(_default.type).toEqualTypeOf<Primitive>();

const _default2 = type(({ primitive }) => ({
  value: primitive(),
}));
expectTypeOf(_default2.type).branded.toEqualTypeOf<{
  value: Primitive;
}>();

const _default3 = type(({ primitive, readonly }) =>
  readonly({
    value: primitive(),
  }),
);
expectTypeOf(_default3.type).branded.toEqualTypeOf<{
  readonly value: Primitive;
}>();

const str1 = type(({ primitive }) => primitive.string());
expectTypeOf(str1.type).branded.toEqualTypeOf<string>();

const str2 = type(({ primitive }) => primitive.string('Hello World'));
expectTypeOf(str2.type).branded.toEqualTypeOf<'Hello World'>();

// primitive.string() → { value: string }
const strDefault = type(({ primitive }) => ({
  value: primitive.string(),
}));
expectTypeOf(strDefault.type).branded.toEqualTypeOf<{ value: string }>();

// primitive.string('hello') → { value: 'hello' }
const strLiteral = type(({ primitive }) => ({
  value: primitive.string('hello'),
}));
expectTypeOf(strLiteral.type).branded.toEqualTypeOf<{ value: 'hello' }>();

// primitive.number() → { value: number }
const numDefault = type(({ primitive }) => ({
  value: primitive.number(),
}));
expectTypeOf(numDefault.type).branded.toEqualTypeOf<{ value: number }>();

// primitive.number(42) → { value: 42 }
const numLiteral = type(({ primitive }) => ({
  value: primitive.number(42),
}));
expectTypeOf(numLiteral.type).branded.toEqualTypeOf<{ value: 42 }>();

// primitive.boolean() → { value: boolean }
const boolDefault = type(({ primitive }) => ({
  value: primitive.boolean(),
}));
expectTypeOf(boolDefault.type).branded.toEqualTypeOf<{ value: boolean }>();

// primitive.boolean(true) → { flag: true }
const boolLiteral = type(({ primitive }) => ({
  flag: primitive.boolean(true),
}));
expectTypeOf(boolLiteral.type).branded.toEqualTypeOf<{ flag: true }>();

// primitive.symbol() → { value: symbol }
const symbolDefault = type(({ primitive }) => ({
  value: primitive.symbol(),
}));
expectTypeOf(symbolDefault.type).branded.toEqualTypeOf<{
  value: symbol;
}>();

// primitive.symbol(Symbol.iterator) → { key: typeof Symbol.iterator }
const symbolLiteral = type(({ primitive }) => ({
  key: primitive.symbol(Symbol.iterator),
}));
expectTypeOf(symbolLiteral.type).branded.toEqualTypeOf<{
  key: typeof Symbol.iterator;
}>();

// primitive.never() → { value: never }
const neverResult = type(({ primitive }) => ({
  value: primitive.never,
}));
expectTypeOf(neverResult.type).branded.toEqualTypeOf<{ value: never }>();

// primitive.undefined() → { value: undefined }
const undefinedResult = type(({ primitive }) => ({
  value: primitive.undefined,
}));
expectTypeOf(undefinedResult.type).branded.toEqualTypeOf<{
  value: undefined;
}>();
