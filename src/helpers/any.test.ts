import { type } from "../type";

describe("Transform: Helper any", () => {
  it("#01 => should handle any helper with string", () => {
    const result = type(({ any }) => ({
      value: any("string"),
    }));
    expect(result).toEqual({ value: undefined });
  });

  it("#02 => should handle any helper with object", () => {
    const result = type(({ any, readonly }) => ({
      data: readonly(any({ name: "string", age: "number" })),
    }));
    expect(result).toEqual({
      data: {
        age: undefined,
        name: undefined,
      },
    });
  });

  it("#03 => should handle any helper with number", () => {
    const result = type(({ any }) => ({
      count: any("number"),
    }));
    expect(result).toEqual({ count: undefined });
  });

  it("#04 => should handle any helper without argument", () => {
    const result = type(({ any }) => ({
      unknown: any(),
    }));
    expect(result).toEqual({ unknown: undefined });
  });
});
