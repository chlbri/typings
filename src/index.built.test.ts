import { addTarball, cleanup, THIS1 } from "@bemedev/dev-utils/build-tests";
import { createTests } from "@bemedev/dev-utils/vitest-extended";
import type { array } from "./helpers/array";
import type { type } from "./type";

beforeAll(addTarball);
afterAll(cleanup);

describe("built", () => {
  describe("#01 -> helpers.array", () => {
    const { acceptation, success } = createTests.withImplementation(
      undefined as unknown as typeof array,
      {
        name: "built",
        instanciation: async () => {
          const fn = await import(`${THIS1}/helpers`).then((m) => m.array);
          return fn;
        },
      },
    );

    describe("#00 => Acceptation", acceptation);

    describe(
      "#01 => Success",
      success(
        {
          invite: "simple array of strings",
          parameters: "string",
          expected: ["string"],
        },
        {
          invite: "simple array of numbers",
          parameters: "number",
          expected: ["number"],
        },
        {
          invite: "complex",
          parameters: { a: "string", b: "number" },
          expected: [{ a: "string", b: "number" }],
        },
      ),
    );
  });

  describe("#02 -> index", () => {
    const { acceptation, success } = createTests.withImplementation(
      undefined as unknown as typeof type,
      {
        name: "built",
        instanciation: async () => {
          const m = await import(THIS1).then((m) => m.type);
          return m;
        },
      },
    );

    describe("#00 => Acceptation", acceptation);
    describe(
      "#01 => Success",
      success(
        {
          invite: "unknown",
          parameters: "unknown",
          expected: expect.objectContaining({ value: "unknown" }),
        },
        {
          invite: "any",
          parameters: "any",
          expected: expect.objectContaining({ value: "any" }),
        },
        {
          invite: "string",
          parameters: "string",
          expected: expect.objectContaining({ value: "string" }),
        },
        {
          invite: "number",
          parameters: "number",
          expected: expect.objectContaining({ value: "number" }),
        },
        {
          invite: "object",
          parameters: { a: "string", b: "number" },
          expected: {
            value: {
              a: "string",
              b: "number",
            },
            "~standard": expect.objectContaining({
              types: {
                input: {
                  a: "string",
                  b: "number",
                },
                output: {
                  a: "string",
                  b: "number",
                },
              },
              vendor: "@bemedev/typings",
              version: 1,
            }),
          },
        },
      ),
    );
  });
});
