import type { inferT, PrimitiveObjectMapS, PrimitiveObjectT } from "../types";
import { type } from "../type";
import primitiveObject from "./primitiveObject";

// No argument — defaults to PrimitiveObjectS
const noArg = primitiveObject();
expectTypeOf(noArg).branded.toEqualTypeOf<PrimitiveObjectT>();

// Primitive type string literal
const withString = primitiveObject("string");
expectTypeOf(withString).toEqualTypeOf<"string">();

// Primitive type number literal
const withNumber = primitiveObject("number");
expectTypeOf(withNumber).toEqualTypeOf<"number">();

// PrimitiveObjectMapS
const withMap = primitiveObject({ name: "string", age: "number" });
expectTypeOf(withMap).toEqualTypeOf<{ name: "string"; age: "number" }>();

// Nested PrimitiveObjectMapS
const withNested = primitiveObject({
  user: { name: "string", active: "boolean" },
});
expectTypeOf(withNested).toEqualTypeOf<{
  user: { name: "string"; active: "boolean" };
}>();

// .map() — defaults to PrimitiveObjectMapS
const mapResult = primitiveObject.map();
expectTypeOf(mapResult).toEqualTypeOf<PrimitiveObjectMapS>();

// inferT: flat map transformation
type FlatMapT = inferT<{ name: "string"; age: "number" }>;
expectTypeOf<FlatMapT>().toEqualTypeOf<{ name: string; age: number }>();

// inferT: nested map transformation
type NestedMapT = inferT<{ user: { name: "string"; active: "boolean" } }>;
expectTypeOf<NestedMapT>().toEqualTypeOf<{
  user: { name: string; active: boolean };
}>();

// inferT: from primitiveObject schema variable
const schemaVar = primitiveObject({ id: "string", score: "number" });
type SchemaVarT = inferT<typeof schemaVar>;
expectTypeOf<SchemaVarT>().toEqualTypeOf<{ id: string; score: number }>();

// inferT: multi-field primitive schema variable
const multiFieldSchema = primitiveObject({
  name: "string",
  age: "number",
  active: "boolean",
});
type MultiFieldT = inferT<typeof multiFieldSchema>;
expectTypeOf<MultiFieldT>().toEqualTypeOf<{
  name: string;
  age: number;
  active: boolean;
}>();

// type() with primitiveObject: flat map
const typeWithFlatMap = type(({ primitiveObject }) =>
  primitiveObject({ name: "string", age: "number" }),
);
expectTypeOf(typeWithFlatMap).toEqualTypeOf<{
  name: string;
  age: number;
}>();

// type() with primitiveObject: primitive string
const typeWithPrimitiveString = type(({ primitiveObject }) =>
  primitiveObject("string"),
);
expectTypeOf(typeWithPrimitiveString).toEqualTypeOf<string>();

// type() with primitiveObject: primitive number
const typeWithPrimitiveNumber = type(({ primitiveObject }) =>
  primitiveObject("number"),
);
expectTypeOf(typeWithPrimitiveNumber).toEqualTypeOf<number>();

// type() with primitiveObject: nested map
const typeWithNested = type(({ primitiveObject }) =>
  primitiveObject({ user: { name: "string", active: "boolean" } }),
);
expectTypeOf(typeWithNested).toEqualTypeOf<{
  user: { name: string; active: boolean };
}>();

// type() with primitiveObject: combined with other helpers
const typeWithCombined = type(({ primitiveObject, optional }) => ({
  schema: primitiveObject({ name: "string", age: "number" }),
  label: optional("string"),
}));
expectTypeOf(typeWithCombined).toEqualTypeOf<{
  schema: { name: string; age: number };
  label?: string;
}>();
