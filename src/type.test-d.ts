import type { StandardSchemaV1 } from "./standard.types";
import type { Sh } from "./types";
import { type } from "./type";

describe("type", () => {
  test("type — no option", () => {
    const result = type();

    expectTypeOf(result).toEqualTypeOf<Sh<unknown>>();
    expectTypeOf(result.value).toEqualTypeOf<unknown>();
    expectTypeOf(result["~standard"].version).toEqualTypeOf<1>();

    expectTypeOf(
      result["~standard"].vendor,
    ).toEqualTypeOf<"@bemedev/typings">();
  });

  test("type — direct string primitive", () => {
    const result = type("string");

    expectTypeOf(result).toEqualTypeOf<Sh<string>>();
    expectTypeOf(result.value).toEqualTypeOf<string>();
  });

  test("type — direct number primitive", () => {
    const result = type("number");
    expectTypeOf(result).toEqualTypeOf<Sh<number>>();
    expectTypeOf(result.value).toEqualTypeOf<number>();
  });

  test("type — direct boolean primitive", () => {
    expectTypeOf(type("boolean")).toEqualTypeOf<Sh<boolean>>();
  });

  test("type — direct null primitive", () => {
    expectTypeOf(type("null")).toEqualTypeOf<Sh<null>>();
  });

  test("type — direct undefined primitive", () => {
    expectTypeOf(type("undefined")).toEqualTypeOf<Sh<undefined>>();
  });

  test("type — direct object option", () => {
    const result = type({ name: "string", age: "number" });

    expectTypeOf(result).toEqualTypeOf<Sh<{ name: string; age: number }>>();
    expectTypeOf(result.value).toEqualTypeOf<{
      name: string;
      age: number;
    }>();
  });

  test("type — empty object option", () => {
    expectTypeOf(type({})).toEqualTypeOf<Sh<unknown>>();
  });

  test("type — ~standard.validate return type", () => {
    const result = type({ flag: "boolean" });

    expectTypeOf(result["~standard"].validate).toExtend<
      (
        value: unknown,
      ) =>
        | StandardSchemaV1.Result<{ flag: boolean }>
        | Promise<StandardSchemaV1.Result<{ flag: boolean }>>
    >();
  });

  test("type — ~standard.types", () => {
    const result = type({ x: "string" });

    expectTypeOf(result["~standard"].types?.input).toEqualTypeOf<
      { x: string } | undefined
    >();

    expectTypeOf(result["~standard"].types?.output).toEqualTypeOf<
      { x: string } | undefined
    >();
  });
});
