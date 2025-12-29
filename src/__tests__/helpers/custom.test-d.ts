import { transform } from '../../transform';

// Custom with number type
const customNumber = transform(({ custom }) => ({
  value: custom<number>(),
}));
expectTypeOf(customNumber).toEqualTypeOf<{ value: number }>();

// Custom with string type
const customString = transform(({ custom }) => ({
  text: custom<string>(),
}));
expectTypeOf(customString).toEqualTypeOf<{ text: string }>();

// Custom with RegExp type
const customRegex = transform(({ custom }) => ({
  pattern: custom<RegExp>(),
}));
expectTypeOf(customRegex).toEqualTypeOf<{ pattern: RegExp }>();

// Custom with complex object type
const customObject = transform(({ custom }) => ({
  data: custom<{ id: number; tags: string[] }>(),
}));
expectTypeOf(customObject).toEqualTypeOf<{
  data: { id: number; tags: string[] };
}>();

// Custom with array type
const customArray = transform(({ custom }) => ({
  items: custom<string[]>(),
}));
expectTypeOf(customArray).toEqualTypeOf<{ items: string[] }>();

// Custom as root
const customRoot = transform(({ custom }) => custom<{ foo: string }>());
expectTypeOf(customRoot).toEqualTypeOf<{ foo: string }>();
