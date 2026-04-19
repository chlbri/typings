import { type } from "../type";

describe("Transform: Primitive types", () => {
  it("#01 => should transform string primitive", () => {
    const result = type(() => ({ name: "string" }));
    expect(result).toEqual({ name: undefined });
  });

  it("#02 => should transform number primitive", () => {
    const result = type(() => ({ age: "number" }));
    expect(result).toEqual({ age: undefined });
  });

  it("#03 => should transform boolean primitive", () => {
    const result = type(() => ({ active: "boolean" }));
    expect(result).toEqual({ active: undefined });
  });

  it("#04 => should transform null primitive", () => {
    const result = type(() => ({ value: "null" }));
    expect(result).toEqual({ value: undefined });
  });

  it("#05 => should transform undefined primitive", () => {
    const result = type(() => ({ value: "undefined" }));
    expect(result).toEqual({ value: undefined });
  });

  it("#06 => should transform symbol primitive", () => {
    const result = type(() => ({ sym: "symbol" }));
    expect(result).toEqual({ sym: undefined });
  });

  it("#07 => should transform date type", () => {
    const result = type(() => ({ createdAt: "date" }));
    expect(result).toEqual({ createdAt: undefined });
  });

  it("#08 => should transform primitive type", () => {
    const result = type(() => ({ value: "primitive" }));
    expect(result).toEqual({ value: undefined });
  });
});
