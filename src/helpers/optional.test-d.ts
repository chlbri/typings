import { type } from "../type";
import type { Sh } from "../types";

const _defaultString = type(({ optional }) => optional("string"));
expectTypeOf(_defaultString).toEqualTypeOf<Sh<string>>();

// optional string
const optionalString = type(({ optional }) => ({
  nickname: optional("string"),
}));
expectTypeOf(optionalString).toEqualTypeOf<
  Sh<{
    nickname?: string;
  }>
>();

// optional number
const optionalNumber = type(({ optional }) => ({
  count: optional("number"),
}));
expectTypeOf(optionalNumber).toEqualTypeOf<Sh<{ count?: number }>>();

// optional boolean
const optionalBoolean = type(({ optional }) => ({
  active: optional("boolean"),
}));
expectTypeOf(optionalBoolean).toEqualTypeOf<
  Sh<{
    active?: boolean;
  }>
>();

// optional object
const optionalObject = type(({ optional }) => ({
  address: optional({ city: "string", zip: "number" }),
}));
expectTypeOf(optionalObject).toEqualTypeOf<
  Sh<{
    address?: { city: string; zip: number };
  }>
>();

// optional array
const optionalArray = type(({ optional, array }) => ({
  items: optional(array("string")),
}));
expectTypeOf(optionalArray).toEqualTypeOf<Sh<{ items?: string[] }>>();

// Nested optional
const nestedoptional = type(({ optional }) => ({
  data: optional({
    inner: optional("string"),
  }),
}));
expectTypeOf(nestedoptional).toEqualTypeOf<
  Sh<{
    data?: { inner?: string };
  }>
>();

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
expectTypeOf(optionalComplex).toEqualTypeOf<
  Sh<{
    user?: {
      name: string;
      tags: string[];
      profile?: { bio: string };
    };
  }>
>();
