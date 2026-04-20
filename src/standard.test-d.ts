import type { StandardSchemaV1 } from "./standard.types";
import { standardize, standardize2 } from "./standard";

describe("standardize — string", () => {
  const s = standardize("hello");

  expectTypeOf(s.value).toEqualTypeOf<string>();
  expectTypeOf(s["~standard"].version).toEqualTypeOf<1>();
  expectTypeOf(s["~standard"].vendor).toEqualTypeOf<"@bemedev/typings">();
  expectTypeOf(s["~standard"].types?.input).toEqualTypeOf<string | undefined>();
  expectTypeOf(s["~standard"].types?.output).toEqualTypeOf<
    string | undefined
  >();

  describe("validate", () => {
    const validated = s["~standard"].validate("anything");
    expectTypeOf(validated).toEqualTypeOf<
      StandardSchemaV1.Result<string> | Promise<StandardSchemaV1.Result<string>>
    >();
  });
});

describe("standardize — number", () => {
  const s = standardize(42);

  expectTypeOf(s.value).toEqualTypeOf<number>();
  expectTypeOf(s["~standard"].types?.input).toEqualTypeOf<number | undefined>();
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
  expectTypeOf(s["~standard"].types?.input).toEqualTypeOf<
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
