import { type } from '../type';
import type { Sh } from '../types';

// Custom with number type
const customNumber = type(({ custom }) => ({
  value: custom<number>(),
}));
expectTypeOf(customNumber).toEqualTypeOf<Sh<{ value: number }>>();

// Custom with string type
const customString = type(({ custom }) => ({
  text: custom<string>(),
}));
expectTypeOf(customString).toEqualTypeOf<Sh<{ text: string }>>();

// Custom with RegExp type
const customRegex = type(({ custom }) => ({
  pattern: custom<RegExp>(),
}));
expectTypeOf(customRegex).toEqualTypeOf<Sh<{ pattern: RegExp }>>();

// Custom with complex object type
const customObject = type(({ custom }) => ({
  data: custom<{ id: number; tags: string[] }>(),
}));
expectTypeOf(customObject).toEqualTypeOf<
  Sh<{
    data: { id: number; tags: string[] };
  }>
>();

// Custom with array type
const customArray = type(({ custom }) => ({
  items: custom<string[]>(),
}));
expectTypeOf(customArray).toEqualTypeOf<Sh<{ items: string[] }>>();

// Custom as root
const customRoot = type(({ custom }) => custom<{ foo: string }>());
expectTypeOf(customRoot).toEqualTypeOf<Sh<{ foo: string }>>();
