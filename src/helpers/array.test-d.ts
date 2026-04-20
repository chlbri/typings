import { type } from "../type";
import type { Sh } from "../types";

// Array of strings
const arrayString = type(({ array }) => ({
  tags: array("string"),
}));
expectTypeOf(arrayString).toEqualTypeOf<Sh<{ tags: string[] }>>();

// Array of numbers
const arrayNumber = type(({ array }) => ({
  scores: array("number"),
}));
expectTypeOf(arrayNumber).toEqualTypeOf<Sh<{ scores: number[] }>>();

// Array of booleans
const arrayBoolean = type(({ array }) => ({
  flags: array("boolean"),
}));
expectTypeOf(arrayBoolean).toEqualTypeOf<Sh<{ flags: boolean[] }>>();

// Array of objects
const arrayObject = type(({ array }) => ({
  users: array({ name: "string", age: "number" }),
}));
expectTypeOf(arrayObject).toEqualTypeOf<
  Sh<{
    users: Array<{ name: string; age: number }>;
  }>
>();

// Nested arrays
const nestedArray = type(({ array }) => ({
  matrix: array(array("number")),
}));
expectTypeOf(nestedArray).toEqualTypeOf<Sh<{ matrix: number[][] }>>();

// Array with nested object
const arrayNestedObject = type(({ array }) => ({
  items: array({
    id: "string",
    data: {
      value: "number",
      label: "string",
    },
  }),
}));
expectTypeOf(arrayNestedObject).toEqualTypeOf<
  Sh<{
    items: Array<{
      id: string;
      data: { value: number; label: string };
    }>;
  }>
>();
