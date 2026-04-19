import { type } from "../type";

// Any with string
const anyString = type(({ any }) => ({
  value: any("string"),
}));
expectTypeOf(anyString).toEqualTypeOf<{ value: string }>();

// Any with number
const anyNumber = type(({ any }) => ({
  count: any("number"),
}));
expectTypeOf(anyNumber).toEqualTypeOf<{ count: number }>();

// Any with object
const anyObject = type(({ any }) => ({
  data: any({ name: "string", age: "number" }),
}));
expectTypeOf(anyObject).toEqualTypeOf<{
  data: { name: string; age: number };
}>();

// Any without argument (defaults to ObjectS)
const anyDefault = type(({ any }) => ({ unknown: any() }));
expectTypeOf(anyDefault.unknown).toEqualTypeOf<any>();
