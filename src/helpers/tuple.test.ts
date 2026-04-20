import { tuple as _tuple } from ".";
import { type } from "../type";

describe("Helper: tuple", () => {
  describe("#00 => direct call", () => {
    test('#01 => tuple("string", "boolean") returns array', () =>
      expect(_tuple("string", "boolean")).toEqual(["string", "boolean"]));
  });

  describe("#01 => tuple of two numbers", () => {
    const result = type(({ tuple }) => ({
      coordinates: tuple("number", "number"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({ coordinates: ["number", "number"] }));

    test("#02 => ~standard.version is 1", () =>
      expect(result["~standard"].version).toBe(1));

    test("#03 => validate() captures the value", () =>
      expect(result["~standard"].validate("any")).toEqual({
        value: { coordinates: ["number", "number"] },
      }));
  });

  describe("#02 => tuple with mixed types", () => {
    const result = type(({ tuple }) => ({
      pair: tuple("string", "number", "boolean"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({
        pair: ["string", "number", "boolean"],
      }));
  });

  describe("#03 => tuple with objects", () => {
    const result = type(({ tuple }) => ({
      data: tuple({ name: "string" }, { age: "number" }),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({
        data: [{ name: "string" }, { age: "number" }],
      }));
  });

  describe("#04 => tuple with three numbers (RGB)", () => {
    const result = type(({ tuple }) => ({
      rgb: tuple("number", "number", "number"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({
        rgb: ["number", "number", "number"],
      }));
  });

  describe("#05 => tuple with string and number", () => {
    const result = type(({ tuple }) => ({
      entry: tuple("string", "number"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({ entry: ["string", "number"] }));
  });
});
