import { UNION } from "../constants";
import { type } from "../type";
import { STANDARD_KEY } from "../constants";

describe("Helper: union", () => {
  describe("#01 => union of two primitives", () => {
    const result = type(({ union }) => ({
      value: union("string", "number"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({
        value: { [UNION]: ["string", "number"] },
      }));

    test(`#02 => ${STANDARD_KEY}.version is 1`, () =>
      expect(result[STANDARD_KEY].version).toBe(1));

    test("#03 => validate() captures the value", () =>
      expect(result[STANDARD_KEY].validate("any")).toEqual({
        value: { value: { [UNION]: ["string", "number"] } },
      }));
  });

  describe("#02 => union of objects", () => {
    const result = type(({ union }) => ({
      item: union({ type: "string" }, { value: "number" }),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({
        item: { [UNION]: [{ type: "string" }, { value: "number" }] },
      }));
  });

  describe("#03 => discriminated union", () => {
    const result = type(({ union }) => ({
      event: union.discriminated(
        "type",
        { type: "string", name: "string" },
        { type: "string", count: "number" },
      ),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({
        event: {
          [UNION]: [
            { type: "string", name: "string" },
            { type: "string", count: "number" },
          ],
        },
      }));
  });

  describe("#04 => union of three primitives", () => {
    const result = type(({ union }) => ({
      value: union("string", "number", "boolean"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({
        value: { [UNION]: ["string", "number", "boolean"] },
      }));
  });

  describe("#05 => union with null", () => {
    const result = type(({ union }) => ({
      nullable: union("string", "null"),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({
        nullable: { [UNION]: ["string", "null"] },
      }));
  });
});
