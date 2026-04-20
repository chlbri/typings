import { type } from "../type";

describe("Helper: record", () => {
  describe("#01 => record with string value (no keys)", () => {
    const result = type(({ record }) => ({
      dict: record("string"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({ dict: {} }));

    test("#02 => ~standard.version is 1", () =>
      expect(result["~standard"].version).toBe(1));

    test("#03 => validate() captures the value", () =>
      expect(result["~standard"].validate("any")).toEqual({
        value: { dict: {} },
      }));
  });

  describe("#02 => record with specific keys", () => {
    const result = type(({ record }) => ({
      config: record("boolean", "enabled", "visible", "active"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({
        config: {
          enabled: "boolean",
          visible: "boolean",
          active: "boolean",
        },
      }));
  });

  describe("#03 => record with object value and keys", () => {
    const result = type(({ record }) => ({
      users: record({ name: "string", age: "number" }, "user1", "user2"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({
        users: {
          user1: { name: "string", age: "number" },
          user2: { name: "string", age: "number" },
        },
      }));
  });

  describe("#04 => record with number value (no keys)", () => {
    const result = type(({ record }) => ({
      scores: record("number"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({ scores: {} }));
  });

  describe("#05 => record with single key", () => {
    const result = type(({ record }) => ({
      single: record("string", "onlyKey"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({ single: { onlyKey: "string" } }));
  });
});
