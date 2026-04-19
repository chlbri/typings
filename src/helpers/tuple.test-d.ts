import { type } from "../type";

// Tuple of two numbers
const tupleNumbers = type(({ tuple }) => ({
  coordinates: tuple("number", "number"),
}));
expectTypeOf(tupleNumbers).toEqualTypeOf<{
  coordinates: [number, number];
}>();

// Tuple with mixed types
const tupleMixed = type(({ tuple }) => ({
  pair: tuple("string", "number", "boolean"),
}));
expectTypeOf(tupleMixed).toEqualTypeOf<{
  pair: [string, number, boolean];
}>();

// Tuple with objects
const tupleObjects = type(({ tuple }) => ({
  data: tuple({ name: "string" }, { age: "number" }),
}));
expectTypeOf(tupleObjects).toEqualTypeOf<{
  data: [{ name: string }, { age: number }];
}>();

// Tuple with three numbers (RGB)
const tupleRgb = type(({ tuple }) => ({
  rgb: tuple("number", "number", "number"),
}));
expectTypeOf(tupleRgb).toEqualTypeOf<{
  rgb: [number, number, number];
}>();

// Tuple with string and number
const tupleEntry = type(({ tuple }) => ({
  entry: tuple("string", "number"),
}));
expectTypeOf(tupleEntry).toEqualTypeOf<{
  entry: [string, number];
}>();

// Tuple with complex objects
const tupleComplex1 = type(({ tuple }) => ({
  bounds: tuple({ min: "number" }, { max: "number" }),
}));
expectTypeOf(tupleComplex1).toEqualTypeOf<{
  bounds: [{ min: number }, { max: number }];
}>();

const tupleComplex2 = type(({ tuple, litterals, array, union }) => ({
  bounds: tuple(
    { min: "number" },
    { max: "number" },
    tuple("string", "boolean"),
    litterals("start", "end"),
    array("number"),
    array(union("number", "string")),
    array(tuple("string", "number")),
    array(tuple("string", array(tuple("number", "boolean")))),
    tuple(tuple("string", "number"), array(tuple("number", "boolean"))),
  ),
  simple: tuple("string", "number"),
  literals: tuple(
    litterals("up"),
    litterals("down"),
    litterals("left"),
    litterals("right"),
  ),
}));

expectTypeOf(tupleComplex2).toEqualTypeOf<{
  bounds: [
    { min: number },
    { max: number },
    [string, boolean],
    "start" | "end",
    number[],
    (number | string)[],
    [string, number][],
    [string, [number, boolean][]][],
    [[string, number], [number, boolean][]],
  ];
  simple: [string, number];
  literals: ["up", "down", "left", "right"];
}>();
