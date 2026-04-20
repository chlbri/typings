import { type } from "../type";
import type { Sh } from "../types";

// Union of primitives
const unionPrimitives = type(({ union }) => ({
  value: union("string", "number"),
}));
expectTypeOf(unionPrimitives).toEqualTypeOf<
  Sh<{
    value: string | number;
  }>
>();

// Union of three primitives
const unionThree = type(({ union }) => ({
  value: union("string", "number", "boolean"),
}));
expectTypeOf(unionThree).toEqualTypeOf<
  Sh<{
    value: string | number | boolean;
  }>
>();

// Union with null
const unionNullable = type(({ union }) => ({
  nullable: union("string", "null"),
}));
expectTypeOf(unionNullable).toEqualTypeOf<
  Sh<{
    nullable: string | null;
  }>
>();

// Union of objects
const unionObjects = type(({ union }) => ({
  item: union({ type: "string" }, { value: "number" }),
}));
expectTypeOf(unionObjects).toEqualTypeOf<
  Sh<{
    item: { type: string } | { value: number };
  }>
>();

// Discriminated union
const discriminatedUnion = type(({ union }) => ({
  event: union.discriminated(
    "type",
    { type: "string", name: "string" },
    { type: "string", count: "number" },
  ),
}));
expectTypeOf(discriminatedUnion).toEqualTypeOf<
  Sh<{
    event: { type: string; name: string } | { type: string; count: number };
  }>
>();

// Complex discriminated union
const complexDiscriminated = type(({ union }) => ({
  response: union.discriminated(
    "status",
    { status: "string", data: "string" },
    { status: "string", error: "string" },
  ),
}));
expectTypeOf(complexDiscriminated).toEqualTypeOf<
  Sh<{
    response:
      | { status: string; data: string }
      | { status: string; error: string };
  }>
>();
