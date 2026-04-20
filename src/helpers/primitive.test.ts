import { type } from "../type";

describe("Helper: primitive", () => {
  describe("#00 => primitive()", () => {
    const result = type(({ primitive }) => primitive());

    test("#01 => value is undefined", () =>
      expect(result.value).toBeUndefined());

    test("#02 => ~standard.version is 1", () =>
      expect(result["~standard"].version).toBe(1));

    test("#03 => validate() returns undefined value", () =>
      expect(result["~standard"].validate("any")).toEqual({
        value: undefined,
      }));
  });

  describe("#01 => primitive.string()", () => {
    const result = type(({ primitive }) => ({
      value: primitive.string(),
    }));

    test("#01 => value.value is undefined", () =>
      expect(result.value.value).toBeUndefined());

    test("#02 => ~standard.version is 1", () =>
      expect(result["~standard"].version).toBe(1));
  });

  describe('#02 => primitive.string("hello")', () => {
    const result = type(({ primitive }) => ({
      value: primitive.string("hello"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({ value: "hello" }));

    test("#02 => validate() captures the value", () =>
      expect(result["~standard"].validate("any")).toEqual({
        value: { value: "hello" },
      }));
  });

  describe("#03 => primitive.number()", () => {
    const result = type(({ primitive }) => ({
      value: primitive.number(),
    }));

    test("#01 => value.value is undefined", () =>
      expect(result.value.value).toBeUndefined());
  });

  describe("#04 => primitive.number(42)", () => {
    const result = type(({ primitive }) => ({
      value: primitive.number(42),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({ value: 42 }));
  });

  describe("#05 => primitive.boolean()", () => {
    const result = type(({ primitive }) => ({
      value: primitive.boolean(),
    }));

    test("#01 => value.value is undefined", () =>
      expect(result.value.value).toBeUndefined());
  });

  describe("#06 => primitive.boolean(true)", () => {
    const result = type(({ primitive }) => ({
      flag: primitive.boolean(true),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({ flag: true }));
  });

  describe("#07 => primitive.symbol()", () => {
    const result = type(({ primitive }) => ({
      value: primitive.symbol(),
    }));

    test("#01 => value.value is undefined", () =>
      expect(result.value.value).toBeUndefined());
  });

  describe("#08 => primitive.symbol(Symbol.iterator)", () => {
    const result = type(({ primitive }) => ({
      key: primitive.symbol(Symbol.iterator),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({ key: Symbol.iterator }));
  });

  describe("#09 => primitive.never", () => {
    const result = type(({ primitive }) => ({
      value: primitive.never,
    }));

    test("#01 => value.value is undefined", () =>
      expect(result.value.value).toBeUndefined());
  });

  describe("#10 => primitive.undefined", () => {
    const result = type(({ primitive }) => ({
      value: primitive.undefined,
    }));

    test("#01 => value.value is undefined", () =>
      expect(result.value.value).toBeUndefined());
  });

  describe("#11 => primitive.bigint()", () => {
    const result = type(({ primitive }) => ({
      value: primitive.bigint(),
    }));

    test("#01 => value.value is undefined", () =>
      expect(result.value.value).toBeUndefined());
  });

  describe("#12 => primitive in readonly object", () => {
    const result = type(({ primitive, readonly }) =>
      readonly({ value: primitive() }),
    );

    test("#01 => value.value is undefined", () =>
      expect(result.value.value).toBeUndefined());

    test("#02 => ~standard.version is 1", () =>
      expect(result["~standard"].version).toBe(1));
  });
});
