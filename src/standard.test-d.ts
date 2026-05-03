import type { StandardSchemaV1 } from "./standard.types";
import { standardize, standardize2 } from "./standard";
import { STANDARD_KEY } from "./constants";

describe("standardize — string", () => {
  const s = standardize("hello");

  expectTypeOf(s.value).toEqualTypeOf<string>();
  expectTypeOf(s[STANDARD_KEY].version).toEqualTypeOf<1>();
  expectTypeOf(s[STANDARD_KEY].vendor).toEqualTypeOf<string>();
  expectTypeOf(s[STANDARD_KEY].types?.input).toEqualTypeOf<
    string | undefined
  >();
  expectTypeOf(s[STANDARD_KEY].types?.output).toEqualTypeOf<
    string | undefined
  >();

  describe("validate", () => {
    const validated = s[STANDARD_KEY].validate("anything");
    expectTypeOf(validated).toEqualTypeOf<
      StandardSchemaV1.Result<string> | Promise<StandardSchemaV1.Result<string>>
    >();
  });
});

describe("standardize — number", () => {
  const s = standardize(42);

  expectTypeOf(s.value).toEqualTypeOf<number>();
  expectTypeOf(s[STANDARD_KEY].types?.input).toEqualTypeOf<
    number | undefined
  >();
});

describe("standardize — undefined", () => {
  const s = standardize(undefined);

  expectTypeOf(s.value).toEqualTypeOf<undefined>();
});

describe("standardize — null", () => {
  const s = standardize(null);

  expectTypeOf(s.value).toEqualTypeOf<null>();
});

describe("standardize — object", () => {
  const s = standardize({ a: 1 });

  expectTypeOf(s.value).toEqualTypeOf<{ a: number }>();
  expectTypeOf(s[STANDARD_KEY].types?.input).toEqualTypeOf<
    { a: number } | undefined
  >();
});

describe("standardize2", () => {
  expectTypeOf(standardize2()).toEqualTypeOf<unknown>();
  expectTypeOf(standardize2<string>("hello")).toEqualTypeOf<string>();
  expectTypeOf(standardize2<number>(42)).toEqualTypeOf<number>();
  expectTypeOf(standardize2<null>(null)).toEqualTypeOf<null>();
  expectTypeOf(standardize2<{ a: number }>({ a: 1 })).toEqualTypeOf<{
    a: number;
  }>();
});
