import { UNION } from "../constants";
import { type } from "../type";

describe("Transform: Complex scenarios", () => {
  describe("#01 => nested structure with array, optional, intersection", () => {
    const result = type(({ array, optional, intersection }) => ({
      nodes: optional(
        array(
          intersection(
            {
              position: { x: "number", y: "number" },
              data: { label: optional("string"), content: "string" },
              input: "boolean",
            },
            { id: "string" },
          ),
        ),
      ),
    }));

    test("#01 => value matches", () =>
      expect(result.value).toEqual({
        nodes: [
          [
            {
              position: { x: "number", y: "number" },
              data: { label: "string", content: "string" },
              input: "boolean",
            },
            { id: "string" },
          ],
        ],
      }));

    test("#02 => ~standard.version is 1", () =>
      expect(result["~standard"].version).toBe(1));
  });

  describe("#02 => complex form schema", () => {
    const result = type(({ array, optional, litterals, custom }) => ({
      fields: array({
        name: "string",
        type: litterals("text", "number", "select", "checkbox"),
        required: "boolean",
        options: optional(array("string")),
        validation: optional({
          min: optional("number"),
          max: optional("number"),
          pattern: optional(custom<RegExp>()),
        }),
      }),
      submitUrl: "string",
      method: litterals("GET", "POST", "PUT", "DELETE"),
    }));

    test('#01 => value.submitUrl is "string"', () =>
      expect(result.value.submitUrl).toBe("string"));

    test("#02 => value.method is array of methods", () =>
      expect(result.value.method).toEqual("GET"));

    test("#03 => value.fields is an array", () =>
      expect(Array.isArray(result.value.fields)).toBe(true));

    test("#04 => ~standard.version is 1", () =>
      expect(result["~standard"].version).toBe(1));
  });

  describe("#03 => API response schema with union", () => {
    const result = type(({ union }) => ({
      status: union("string", "number"),
    }));

    test("#01 => value.status has UNION marker", () =>
      expect(result.value).toEqual({
        status: { [UNION]: ["string", "number"] },
      }));
  });

  describe("#04 => deeply nested readonly", () => {
    const result = type(({ readonly, optional, soa, litterals, any }) =>
      readonly({
        name: "string",
        nickname: optional("string"),
        tags: soa("string"),
        status: litterals("active", "inactive"),
        metadata: any({ createdAt: "date", updatedAt: "date" }),
      }),
    );

    test('#01 => value.name is "string"', () =>
      expect(result.value.name).toBe("string"));

    test('#02 => value.nickname is "string"', () =>
      expect(result.value.nickname).toBe("string"));

    test('#03 => value.tags is "string"', () =>
      expect(result.value.tags).toBe("string"));

    test("#04 => ~standard.version is 1", () =>
      expect(result["~standard"].version).toBe(1));

    test("#05 => value.status is 'active'", () =>
      expect(result.value.status).toBe("active"));
  });
});
