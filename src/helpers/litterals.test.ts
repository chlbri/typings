import { type } from "../type";

describe("Helper: litterals", () => {
  describe("#01 => string literals", () => {
    const result = type(({ litterals }) => ({
      status: litterals("active", "inactive", "pending"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({
        status: "active",
      }));

    test("#02 => ~standard.version is 1", () =>
      expect(result["~standard"].version).toBe(1));

    test("#03 => validate() captures the value", () =>
      expect(result["~standard"].validate("any")).toEqual({
        value: { status: "active" },
      }));
  });

  describe("#02 => number literals", () => {
    const result = type(({ litterals }) => ({
      priority: litterals(1, 2, 3),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({ priority: 1 }));
  });

  describe("#03 => boolean literals", () => {
    const result = type(({ litterals }) => ({
      flag: litterals(true, false),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({ flag: true }));
  });

  describe("#04 => mixed literals", () => {
    const result = type(({ litterals }) => ({
      value: litterals("yes", "no", 1, 0, true),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({
        value: "yes",
      }));
  });

  describe("#05 => two string literals", () => {
    const result = type(({ litterals }) => ({
      direction: litterals("left", "right"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({ direction: "left" }));
  });
});
