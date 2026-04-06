import { type } from '../type';

// Custom with number type
const customNumber = type(({ custom }) => ({
  value: custom<number>(),
}));
expectTypeOf(customNumber).toEqualTypeOf<{ value: number }>();

// Custom with string type
const customString = type(({ custom }) => ({
  text: custom<string>(),
}));
expectTypeOf(customString).toEqualTypeOf<{ text: string }>();

// Custom with RegExp type
const customRegex = type(({ custom }) => ({
  pattern: custom<RegExp>(),
}));
expectTypeOf(customRegex).toEqualTypeOf<{ pattern: RegExp }>();

// Custom with complex object type
const customObject = type(({ custom }) => ({
  data: custom<{ id: number; tags: string[] }>(),
}));
expectTypeOf(customObject).toEqualTypeOf<{
  data: { id: number; tags: string[] };
}>();

// Custom with array type
const customArray = type(({ custom }) => ({
  items: custom<string[]>(),
}));
expectTypeOf(customArray).toEqualTypeOf<{ items: string[] }>();

// Custom as root
const customRoot = type(({ custom }) => custom<{ foo: string }>());
expectTypeOf(customRoot).toEqualTypeOf<{ foo: string }>();
