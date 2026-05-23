import { STANDARD_KEY } from "../constants";
import { isSh } from "./isSh";

describe("isSh", () => {
  describe("#01 => with valid Sh object", () => {
    const validSh = {
      __type: "Sh",
      type: "test",
      [STANDARD_KEY]: {
        version: 1,
        vendor: "@bemedev/typings",
        types: {
          input: "string",
          output: "string",
        },
        validate: () => ({ value: "test" }),
      },
    };

    test("#01 => returns true", () => expect(isSh(validSh)).toBe(true));
  });

  describe("#02 => with non-object values", () => {
    test("#01 => string returns false", () =>
      expect(isSh("hello")).toBe(false));

    test("#02 => number returns false", () => expect(isSh(42)).toBe(false));

    test("#03 => boolean returns false", () => expect(isSh(true)).toBe(false));

    test("#04 => undefined returns false", () =>
      expect(isSh(undefined)).toBe(false));

    test("#05 => null returns false", () => expect(isSh(null)).toBe(false));

    test("#06 => array returns false", () =>
      expect(isSh([1, 2, 3])).toBe(false));
  });

  describe("#03 => missing top-level properties", () => {
    const base = {
      __type: "Sh",
      type: "test",
      [STANDARD_KEY]: {
        version: 1,
        vendor: "@bemedev/typings",
        types: { input: "string", output: "string" },
        validate: () => ({ value: "test" }),
      },
    };

    test("#01 => missing __type returns false", () => {
      const { __type, ...rest } = base;
      expect(isSh(rest)).toBe(false);
    });

    test("#02 => missing type returns false", () => {
      const { type: _, ...rest } = base;
      expect(isSh(rest)).toBe(false);
    });

    test("#03 => missing STANDARD_KEY returns false", () => {
      const obj = { __type: "Sh", type: "test" };
      expect(isSh(obj)).toBe(false);
    });
  });

  describe("#04 => STANDARD_KEY property issues", () => {
    const base = {
      __type: "Sh",
      type: "test",
      [STANDARD_KEY]: {
        version: 1,
        vendor: "@bemedev/typings",
        types: { input: "string", output: "string" },
        validate: () => ({ value: "test" }),
      },
    };

    test("#01 => STANDARD_KEY is not an object returns false", () => {
      expect(isSh({ ...base, [STANDARD_KEY]: "string" })).toBe(false);
    });

    test("#02 => STANDARD_KEY is null returns false", () => {
      expect(isSh({ ...base, [STANDARD_KEY]: null })).toBe(false);
    });
  });

  describe("#05 => version property issues", () => {
    const base = {
      __type: "Sh",
      type: "test",
      [STANDARD_KEY]: {
        version: 1,
        vendor: "@bemedev/typings",
        types: { input: "string", output: "string" },
        validate: () => ({ value: "test" }),
      },
    };

    test("#01 => missing version returns false", () => {
      const obj = {
        ...base,
        [STANDARD_KEY]: {
          vendor: "@bemedev/typings",
          types: { input: "string", output: "string" },
          validate: () => ({ value: "test" }),
        },
      };
      expect(isSh(obj)).toBe(false);
    });

    test("#02 => version is not a number returns false", () => {
      const obj = {
        ...base,
        [STANDARD_KEY]: {
          ...base[STANDARD_KEY],
          version: "1",
        },
      };
      expect(isSh(obj)).toBe(false);
    });
  });

  describe("#06 => vendor property issues", () => {
    const base = {
      __type: "Sh",
      type: "test",
      [STANDARD_KEY]: {
        version: 1,
        vendor: "@bemedev/typings",
        types: { input: "string", output: "string" },
        validate: () => ({ value: "test" }),
      },
    };

    test("#01 => missing vendor returns false", () => {
      const obj = {
        ...base,
        [STANDARD_KEY]: {
          version: 1,
          types: { input: "string", output: "string" },
          validate: () => ({ value: "test" }),
        },
      };
      expect(isSh(obj)).toBe(false);
    });

    test("#02 => vendor is not a string returns false", () => {
      const obj = {
        ...base,
        [STANDARD_KEY]: {
          ...base[STANDARD_KEY],
          vendor: 123,
        },
      };
      expect(isSh(obj)).toBe(false);
    });
  });

  describe("#07 => types property issues", () => {
    const base = {
      __type: "Sh",
      type: "test",
      [STANDARD_KEY]: {
        version: 1,
        vendor: "@bemedev/typings",
        types: { input: "string", output: "string" },
        validate: () => ({ value: "test" }),
      },
    };

    test("#01 => missing types returns false", () => {
      const obj = {
        ...base,
        [STANDARD_KEY]: {
          version: 1,
          vendor: "@bemedev/typings",
          validate: () => ({ value: "test" }),
        },
      };
      expect(isSh(obj)).toBe(false);
    });

    test("#02 => types is not an object returns false", () => {
      const obj = {
        ...base,
        [STANDARD_KEY]: {
          ...base[STANDARD_KEY],
          types: "string",
        },
      };
      expect(isSh(obj)).toBe(false);
    });

    test("#03 => types is null returns false", () => {
      const obj = {
        ...base,
        [STANDARD_KEY]: {
          ...base[STANDARD_KEY],
          types: null,
        },
      };
      expect(isSh(obj)).toBe(false);
    });

    test("#04 => types missing input returns false", () => {
      const obj = {
        ...base,
        [STANDARD_KEY]: {
          ...base[STANDARD_KEY],
          types: { output: "string" },
        },
      };
      expect(isSh(obj)).toBe(false);
    });

    test("#05 => types missing output returns false", () => {
      const obj = {
        ...base,
        [STANDARD_KEY]: {
          ...base[STANDARD_KEY],
          types: { input: "string" },
        },
      };
      expect(isSh(obj)).toBe(false);
    });
  });

  describe("#08 => validate property issues", () => {
    const base = {
      __type: "Sh",
      type: "test",
      [STANDARD_KEY]: {
        version: 1,
        vendor: "@bemedev/typings",
        types: { input: "string", output: "string" },
        validate: () => ({ value: "test" }),
      },
    };

    test("#01 => missing validate returns false", () => {
      const obj = {
        ...base,
        [STANDARD_KEY]: {
          version: 1,
          vendor: "@bemedev/typings",
          types: { input: "string", output: "string" },
        },
      };
      expect(isSh(obj)).toBe(false);
    });

    test("#02 => validate is not a function returns false", () => {
      const obj = {
        ...base,
        [STANDARD_KEY]: {
          ...base[STANDARD_KEY],
          validate: "not a function",
        },
      };
      expect(isSh(obj)).toBe(false);
    });
  });

  describe("#09 => with extra properties", () => {
    const validSh = {
      __type: "Sh",
      type: "test",
      extra: "property",
      [STANDARD_KEY]: {
        version: 1,
        vendor: "@bemedev/typings",
        types: { input: "string", output: "string" },
        validate: () => ({ value: "test" }),
        extraProp: "ignored",
      },
    };

    test("#01 => returns true with extra properties", () =>
      expect(isSh(validSh)).toBe(true));
  });

  describe("#10 => with complex input/output types", () => {
    const validSh = {
      __type: "Sh",
      type: "test",
      [STANDARD_KEY]: {
        version: 1,
        vendor: "@bemedev/typings",
        types: {
          input: { complex: "object" },
          output: ["array", "of", "values"],
        },
        validate: () => ({ value: "test" }),
      },
    };

    test("#01 => returns true with complex types", () =>
      expect(isSh(validSh)).toBe(true));
  });
});
