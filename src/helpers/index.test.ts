import { PRIMITIVES } from "../constants";
import { type } from "../type";
import { createTests } from "@bemedev/dev-utils/vitest-extended";

describe("Coverage, simple option", () => {
  test("#01 => no arg", () => {
    expect(type()).toBeUndefined();
  });

  describe("#02 => primitives", () => {
    const VALUES = PRIMITIVES.map((key) => [key] as const);

    it.each(VALUES)(`#0%# => should transform '%s' to undefined`, (input) => {
      const result = type(input);
      expect(result).toBeUndefined();
    });
  });

  describe("#03 => objects", () => {
    const { acceptation, success } = createTests(type);
    describe("#00 => Acceptation", acceptation);

    describe(
      "#01 => Success cases",
      success(
        {
          invite: "empty object",
          parameters: {},
          expected: {},
        },
        {
          invite: "simple object",
          parameters: { name: "string", age: "number" },
          expected: { name: undefined, age: undefined },
        },
        {
          invite: "recursive object",
          parameters: {
            user: {
              name: "string",
              active: "boolean",
            },
          },
          expected: {
            user: {
              name: undefined,
              active: undefined,
            },
          },
        },
      ),
    );
  });
});
