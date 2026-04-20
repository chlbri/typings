import { type } from "../type";

describe("Helper: custom", () => {
  describe("#01 => custom with no argument", () => {
    const result = type(({ custom }) => ({
      value: custom<number>(),
    }));

    test("#01 => value.value is undefined", () =>
      expect(result.value.value).toBeUndefined());

    test("#02 => ~standard.version is 1", () =>
      expect(result["~standard"].version).toBe(1));
  });

  describe("#02 => custom with string value", () => {
    const result = type(({ custom }) => ({
      value: custom("test"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({ value: "test" }));

    test("#02 => validate() captures the value", () =>
      expect(result["~standard"].validate("any")).toEqual({
        value: { value: "test" },
      }));
  });

  describe("#03 => custom as root", () => {
    const result = type(({ custom }) => custom<string>());

    test("#01 => value is undefined", () =>
      expect(result.value).toBeUndefined());

    test("#02 => ~standard.version is 1", () =>
      expect(result["~standard"].version).toBe(1));
  });

  describe("#04 => custom with RegExp type", () => {
    const result = type(({ custom }) => ({
      regex: custom<RegExp>(),
    }));

    test("#01 => value.regex is undefined", () =>
      expect(result.value.regex).toBeUndefined());
  });

  describe("#05 => custom with array type", () => {
    const result = type(({ custom }) => ({
      items: custom<string[]>(),
    }));

    test("#01 => value.items is undefined", () =>
      expect(result.value.items).toBeUndefined());
  });
});
