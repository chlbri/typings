import { type } from "../type";
import { primitiveObject } from "./primitiveObject";

describe("Helper: primitiveObject", () => {
  it("#01 => should return empty object when called with no argument", () => {
    const result = primitiveObject();
    expect(result).toEqual({});
  });

  it("#02 => should return the value when called with a primitive string type", () => {
    const result = primitiveObject("string");
    expect(result).toBe("string");
  });

  it("#03 => should return the value when called with a primitive number type", () => {
    const result = primitiveObject("number");
    expect(result).toBe("number");
  });

  it("#04 => should return the value when called with a PrimitiveObjectMapS", () => {
    const result = primitiveObject({ name: "string", age: "number" });
    expect(result).toEqual({ name: "string", age: "number" });
  });

  it("#05 => should return the value when called with a nested PrimitiveObjectMapS", () => {
    const result = primitiveObject({
      user: { name: "string", active: "boolean" },
    });
    expect(result).toEqual({
      user: { name: "string", active: "boolean" },
    });
  });

  it("#06 => should return empty object from map()", () => {
    const result = primitiveObject.map();
    expect(result).toEqual({});
  });

  it("#07 => should transform primitiveObject map via type()", () => {
    const result = type(({ primitiveObject }) =>
      primitiveObject({ name: "string", age: "number" }),
    );
    expect(result).toEqual({ name: undefined, age: undefined });
  });

  it("#08 => should transform primitiveObject primitive string via type()", () => {
    const result = type(({ primitiveObject }) => primitiveObject("string"));
    expect(result).toBeUndefined();
  });

  it("#09 => should transform primitiveObject primitive number via type()", () => {
    const result = type(({ primitiveObject }) => primitiveObject("number"));
    expect(result).toBeUndefined();
  });

  it("#10 => should transform primitiveObject nested map via type()", () => {
    const result = type(({ primitiveObject }) =>
      primitiveObject({ user: { name: "string", active: "boolean" } }),
    );
    expect(result).toEqual({
      user: { name: undefined, active: undefined },
    });
  });

  it("#11 => should transform primitiveObject combined with other helpers via type()", () => {
    const result = type(({ primitiveObject, optional }) => ({
      schema: primitiveObject({ name: "string", age: "number" }),
      label: optional("string"),
    }));
    expect(result).toEqual({
      schema: { name: undefined, age: undefined },
      label: undefined,
    });
  });
});
