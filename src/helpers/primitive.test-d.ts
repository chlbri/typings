import { type } from "../type";
import type { Primiive } from "../types";

const _default = type(({ primitive }) => primitive());
expectTypeOf(_default).toEqualTypeOf<Primiive>();

const _default2 = type(({ primitive }) => ({
  value: primitive(),
}));
expectTypeOf(_default2).toEqualTypeOf<{
  value: Primiive;
}>();

const _default3 = type(({ primitive, readonly }) =>
  readonly({
    value: primitive(),
  }),
);
expectTypeOf(_default3).toEqualTypeOf<{
  readonly value: Primiive;
}>();

const str1 = type(({ primitive }) => primitive.string());
expectTypeOf(str1).toEqualTypeOf<string>();

const str2 = type(({ primitive }) => primitive.string("Hello World"));
expectTypeOf(str2).toEqualTypeOf<"Hello World">();

// primitive.string() → { value: string }
const strDefault = type(({ primitive }) => ({
  value: primitive.string(),
}));
expectTypeOf(strDefault).toEqualTypeOf<{ value: string }>();

// primitive.string('hello') → { value: 'hello' }
const strLiteral = type(({ primitive }) => ({
  value: primitive.string("hello"),
}));
expectTypeOf(strLiteral).toEqualTypeOf<{ value: "hello" }>();

// primitive.number() → { value: number }
const numDefault = type(({ primitive }) => ({
  value: primitive.number(),
}));
expectTypeOf(numDefault).toEqualTypeOf<{ value: number }>();

// primitive.number(42) → { value: 42 }
const numLiteral = type(({ primitive }) => ({
  value: primitive.number(42),
}));
expectTypeOf(numLiteral).toEqualTypeOf<{ value: 42 }>();

// primitive.boolean() → { value: boolean }
const boolDefault = type(({ primitive }) => ({
  value: primitive.boolean(),
}));
expectTypeOf(boolDefault).toEqualTypeOf<{ value: boolean }>();

// primitive.boolean(true) → { flag: true }
const boolLiteral = type(({ primitive }) => ({
  flag: primitive.boolean(true),
}));
expectTypeOf(boolLiteral).toEqualTypeOf<{ flag: true }>();

// primitive.symbol() → { value: symbol }
const symbolDefault = type(({ primitive }) => ({
  value: primitive.symbol(),
}));
expectTypeOf(symbolDefault).toEqualTypeOf<{ value: symbol }>();

// primitive.symbol(Symbol.iterator) → { key: typeof Symbol.iterator }
const symbolLiteral = type(({ primitive }) => ({
  key: primitive.symbol(Symbol.iterator),
}));
expectTypeOf(symbolLiteral).toEqualTypeOf<{
  key: typeof Symbol.iterator;
}>();

// primitive.never() → { value: never }
const neverResult = type(({ primitive }) => ({
  value: primitive.never(),
}));
expectTypeOf(neverResult).toEqualTypeOf<{ value: never }>();

// primitive.undefined() → { value: undefined }
const undefinedResult = type(({ primitive }) => ({
  value: primitive.undefined(),
}));
expectTypeOf(undefinedResult).toEqualTypeOf<{ value: undefined }>();
