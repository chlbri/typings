import { type } from "../type";

// optional string
const optionalString = type(({ optional }) => ({
  nickname: optional("string"),
}));
expectTypeOf(optionalString).toEqualTypeOf<{
  nickname?: string;
}>();

// optional number
const optionalNumber = type(({ optional }) => ({
  count: optional("number"),
}));
expectTypeOf(optionalNumber).toEqualTypeOf<{ count?: number }>();

// optional boolean
const optionalBoolean = type(({ optional }) => ({
  active: optional("boolean"),
}));
expectTypeOf(optionalBoolean).toEqualTypeOf<{
  active?: boolean;
}>();

// optional object
const optionalObject = type(({ optional }) => ({
  address: optional({ city: "string", zip: "number" }),
}));
expectTypeOf(optionalObject).toEqualTypeOf<{
  address?: { city: string; zip: number };
}>();

// optional array
const optionalArray = type(({ optional, array }) => ({
  items: optional(array("string")),
}));
expectTypeOf(optionalArray).toEqualTypeOf<{ items?: string[] }>();

// Nested optional
const nestedoptional = type(({ optional }) => ({
  data: optional({
    inner: optional("string"),
  }),
}));
expectTypeOf(nestedoptional).toEqualTypeOf<{
  data?: { inner?: string };
}>();

// optional with complex object
const optionalComplex = type(({ optional, array }) => ({
  user: optional({
    name: "string",
    tags: array("string"),
    profile: optional({
      bio: "string",
    }),
  }),
}));
expectTypeOf(optionalComplex).toEqualTypeOf<{
  user?: {
    name: string;
    tags: string[];
    profile?: { bio: string };
  };
}>();
