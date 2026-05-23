import { type } from "../type";

// Union of primitives
const unionPrimitives = type(({ union }) => ({
  value: union("string", "number"),
}));
expectTypeOf(unionPrimitives.type).toEqualTypeOf<{
  value: string | number;
}>();

// Union of three primitives
const unionThree = type(({ union }) => ({
  value: union("string", "number", "boolean"),
}));
expectTypeOf(unionThree.type).toEqualTypeOf<{
  value: string | number | boolean;
}>();

// Union with null
const unionNullable = type(({ union }) => ({
  nullable: union("string", "null"),
}));
expectTypeOf(unionNullable.type).toEqualTypeOf<{
  nullable: string | null;
}>();

// Union of objects
const unionObjects = type(({ union }) => ({
  item: union({ type: "string" }, { value: "number" }),
}));
expectTypeOf(unionObjects.type).toEqualTypeOf<{
  item: { type: string } | { value: number };
}>();

// Discriminated union
const discriminatedUnion = type(({ union }) => ({
  event: union.discriminated(
    "type",
    { type: "string", name: "string" },
    { type: "string", count: "number" },
  ),
}));
expectTypeOf(discriminatedUnion.type).toEqualTypeOf<{
  event: { type: string; name: string } | { type: string; count: number };
}>();

// Complex discriminated union
const complexDiscriminated = type(({ union }) => ({
  response: union.discriminated(
    "status",
    { status: "string", data: "string" },
    { status: "string", error: "string" },
  ),
}));
expectTypeOf(complexDiscriminated.type).toEqualTypeOf<{
  response:
    | { status: string; data: string }
    | { status: string; error: string };
}>();
