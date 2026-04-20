import { type } from "../type";

describe("Helper: optional", () => {
  describe("#01 => optional string", () => {
    const result = type(({ optional }) => ({
      nickname: optional("string"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({ nickname: "string" }));

    test("#02 => ~standard.version is 1", () =>
      expect(result["~standard"].version).toBe(1));

    test("#03 => validate() captures the value", () =>
      expect(result["~standard"].validate("any")).toEqual({
        value: { nickname: "string" },
      }));
  });

  describe("#02 => optional object", () => {
    const result = type(({ optional }) => ({
      address: optional({ city: "string", zip: "number" }),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({
        address: { city: "string", zip: "number" },
      }));
  });

  describe("#03 => optional array", () => {
    const result = type(({ optional, array }) => ({
      items: optional(array("string")),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({ items: ["string"] }));
  });

  describe("#04 => optional number", () => {
    const result = type(({ optional }) => ({
      count: optional("number"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({ count: "number" }));
  });

  describe("#05 => optional boolean", () => {
    const result = type(({ optional }) => ({
      active: optional("boolean"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({ active: "boolean" }));
  });

  describe("#06 => nested optional", () => {
    const result = type(({ optional }) => ({
      data: optional({ inner: optional("string") }),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({ data: { inner: "string" } }));
  });

  describe("#07 => optional at root", () => {
    const result = type(({ optional }) => optional("string"));

    test("#01 => value is string", () => expect(result.value).toBe("string"));

    test("#02 => ~standard.version is 1", () =>
      expect(result["~standard"].version).toBe(1));
  });
});
