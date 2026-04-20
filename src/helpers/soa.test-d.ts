import type { Sh, SoA } from "../types";
import { type } from "../type";

// SoA with string
const soaString = type(({ soa }) => ({
  value: soa("string"),
}));
expectTypeOf(soaString).toEqualTypeOf<
  Sh<{
    value: SoA<string>;
  }>
>();

// SoA with number
const soaNumber = type(({ soa }) => ({
  count: soa("number"),
}));
expectTypeOf(soaNumber).toEqualTypeOf<
  Sh<{
    count: SoA<number>;
  }>
>();

// SoA with boolean
const soaBoolean = type(({ soa }) => ({
  flag: soa("boolean"),
}));
expectTypeOf(soaBoolean).toEqualTypeOf<
  Sh<{
    flag: SoA<boolean>;
  }>
>();

// SoA with object
const soaObject = type(({ soa }) => ({
  item: soa({ name: "string" }),
}));
expectTypeOf(soaObject).toEqualTypeOf<
  Sh<{
    item: SoA<{ name: string }>;
  }>
>();

// SoA with complex object
const soaComplex = type(({ soa }) => ({
  user: soa({ id: "string", name: "string", age: "number" }),
}));
expectTypeOf(soaComplex).toEqualTypeOf<
  Sh<{
    user: SoA<{ id: string; name: string; age: number }>;
  }>
>();
