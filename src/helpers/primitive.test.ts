import { type } from "../type";

describe("Helper: primitive", () => {
  it("#00 => primitive()", () => {
    const result = type(({ primitive }) => primitive());
    expect(result).toBeUndefined();
  });
  it("#01 => primitive.string()", () => {
    const result = type(({ primitive }) => ({
      value: primitive.string(),
    }));
    expect(result).toEqual({ value: undefined });
  });

  it('#02 => primitive.string("hello")', () => {
    const result = type(({ primitive }) => ({
      value: primitive.string("hello"),
    }));
    expect(result).toEqual({ value: undefined });
  });

  it("#03 => primitive.number()", () => {
    const result = type(({ primitive }) => ({
      value: primitive.number(),
    }));
    expect(result).toEqual({ value: undefined });
  });

  it("#04 => primitive.number(42)", () => {
    const result = type(({ primitive }) => ({
      value: primitive.number(42),
    }));
    expect(result).toEqual({ value: undefined });
  });

  it("#05 => primitive.boolean()", () => {
    const result = type(({ primitive }) => ({
      value: primitive.boolean(),
    }));
    expect(result).toEqual({ value: undefined });
  });

  it("#06 => primitive.boolean(true)", () => {
    const result = type(({ primitive }) => ({
      flag: primitive.boolean(true),
    }));
    expect(result).toEqual({ flag: undefined });
  });

  it("#07 => primitive.symbol()", () => {
    const result = type(({ primitive }) => ({
      value: primitive.symbol(),
    }));
    expect(result).toEqual({ value: undefined });
  });

  it("#08 => primitive.symbol(Symbol.iterator)", () => {
    const result = type(({ primitive }) => ({
      key: primitive.symbol(Symbol.iterator),
    }));
    expect(result).toEqual({ key: undefined });
  });

  it("#09 => primitive.never()", () => {
    const result = type(({ primitive }) => ({ value: primitive.never() }));
    expect(result).toEqual({ value: undefined });
  });

  it("#10 => primitive.undefined()", () => {
    const result = type(({ primitive }) => ({
      value: primitive.undefined(),
    }));
    expect(result).toEqual({ value: undefined });
  });

  it("#11 => primitive.bigint()", () => {
    const result = type(({ primitive }) => ({
      value: primitive.bigint(),
    }));
    expect(result).toEqual({ value: undefined });
  });
});
