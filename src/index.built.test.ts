import { addTarball, cleanup, THIS1 } from "@bemedev/dev-utils/build-tests";
import { createTests } from "@bemedev/dev-utils/vitest-extended";
import { STANDARD_KEY } from "./constants";

beforeAll(addTarball);
afterAll(cleanup);

describe("built", () => {
  describe("#01 -> helpers.array", () => {
    const { acceptation, success } = createTests.withImplementation(
      undefined as any,
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
      undefined as any,
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
          expected: expect.objectContaining({ type: "unknown" }),
        },
        {
          invite: "any",
          parameters: "any",
          expected: expect.objectContaining({ type: "any" }),
        },
        {
          invite: "string",
          parameters: "string",
          expected: expect.objectContaining({ type: "string" }),
        },
        {
          invite: "number",
          parameters: "number",
          expected: expect.objectContaining({ __type: "number" }),
        },
        {
          invite: "object",
          parameters: { a: "string", b: "number" },
          expected: {
            type: {
              a: "string",
              b: "number",
            },
            __type: {
              a: "string",
              b: "number",
            },
            [STANDARD_KEY]: expect.objectContaining({
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
