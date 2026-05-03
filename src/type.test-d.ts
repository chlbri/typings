import type { StandardSchemaV1 } from "./standard.types";
import type { inferT, Sh } from "./types";
import { type } from "./type";
import { STANDARD_KEY } from "./constants";

describe("type", () => {
  test("type — no option", () => {
    const result = type();

    expectTypeOf(result).toEqualTypeOf<Sh<unknown>>();
    expectTypeOf(result.value).toEqualTypeOf<unknown>();
    expectTypeOf(result[STANDARD_KEY].version).toEqualTypeOf<1>();

    expectTypeOf(result[STANDARD_KEY].vendor).toEqualTypeOf<string>();
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
    expectTypeOf(result.value).toEqualTypeOf<inferT<typeof result>>();
  });

  test("type — direct boolean primitive", () => {
    const result = type("boolean");
    expectTypeOf(result).toEqualTypeOf<Sh<boolean>>();
    expectTypeOf(result.value).toEqualTypeOf<boolean>();
    expectTypeOf(result.value).toEqualTypeOf<inferT<typeof result>>();
  });

  test("type — direct null primitive", () => {
    const result = type("null");
    expectTypeOf(result).toEqualTypeOf<Sh<null>>();
    expectTypeOf(result.value).toEqualTypeOf<null>();
    expectTypeOf(result.value).toEqualTypeOf<inferT<typeof result>>();
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

  test(`type — ${STANDARD_KEY}.validate return type`, () => {
    const result = type({ flag: "boolean" });

    expectTypeOf(result[STANDARD_KEY].validate).toExtend<
      (
        value: unknown,
      ) =>
        | StandardSchemaV1.Result<{ flag: boolean }>
        | Promise<StandardSchemaV1.Result<{ flag: boolean }>>
    >();
  });

  test(`type — ${STANDARD_KEY}.types`, () => {
    const result = type({ x: "string" });

    expectTypeOf(result[STANDARD_KEY].types?.input).toEqualTypeOf<
      { x: string } | undefined
    >();

    expectTypeOf(result[STANDARD_KEY].types?.output).toEqualTypeOf<
      { x: string } | undefined
    >();
  });
});
