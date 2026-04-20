import { type } from "../type";
import type { Sh } from "../types";

// Intersection of two objects
const intersectionTwo = type(({ intersection }) => ({
  person: intersection({ name: "string" }, { age: "number" }),
}));
expectTypeOf(intersectionTwo).toEqualTypeOf<
  Sh<{
    person: { name: string; age: number };
  }>
>();

// Intersection of three objects
const intersectionThree = type(({ intersection }) => ({
  entity: intersection(
    { id: "string" },
    { name: "string" },
    { createdAt: "date" },
  ),
}));
expectTypeOf(intersectionThree).toEqualTypeOf<
  Sh<{
    entity: { id: string; name: string; createdAt: Date };
  }>
>();

// Intersection with nested properties
const intersectionNested = type(({ intersection }) => ({
  data: intersection(
    { user: { name: "string" } },
    { meta: { timestamp: "number" } },
  ),
}));
expectTypeOf(intersectionNested).toEqualTypeOf<
  Sh<{
    data: {
      user: { name: string };
      meta: { timestamp: number };
    };
  }>
>();

// Intersection of four objects
const intersectionFour = type(({ intersection }) => ({
  full: intersection(
    { a: "string" },
    { b: "number" },
    { c: "boolean" },
    { d: "date" },
  ),
}));
expectTypeOf(intersectionFour).toEqualTypeOf<
  Sh<{
    full: { a: string; b: number; c: boolean; d: Date };
  }>
>();

// Complex intersection with arrays and any
const intersectionComplex = type(({ any, intersection, array }) => ({
  item: any(
    intersection(
      { id: "string", tags: array("string") },
      { createdAt: "date", active: "boolean" },
    ),
  ),
}));
expectTypeOf(intersectionComplex).toEqualTypeOf<
  Sh<{
    item: {
      id: string;
      tags: string[];
      createdAt: Date;
      active: boolean;
    };
  }>
>();
