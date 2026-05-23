import { pretype, type } from "../type";
import { primitiveObject } from "./primitiveObject";
import { STANDARD_KEY } from "../constants";
import type { PrimitiveObjectT } from "../types";

describe("Helper: primitiveObject", () => {
  describe("#01 => direct call — no argument", () => {
    const result = primitiveObject();

    test("#01 => returns undefined", () => expect(result).toBeUndefined());
  });

  describe("#02 => direct call — string literal", () => {
    const result = primitiveObject("string");

    test("#01 => returns the string", () => expect(result).toBe("string"));
  });

  describe("#03 => direct call — number literal", () => {
    const result = primitiveObject("number");

    test("#01 => returns the string", () => expect(result).toBe("number"));
  });

  describe("#04 => direct call — map", () => {
    const result = primitiveObject({ name: "string", age: "number" });

    test("#01 => returns the map", () =>
      expect(result).toEqual({ name: "string", age: "number" }));
  });

  describe("#05 => direct call — nested map", () => {
    const result = primitiveObject({
      user: { name: "string", active: "boolean" },
    });

    test("#01 => returns the nested map", () =>
      expect(result).toEqual({
        user: { name: "string", active: "boolean" },
      }));
  });

  describe("#06 => .map() — no argument", () => {
    const result = primitiveObject.map();

    test("#01 => returns undefined", () => expect(result).toBeUndefined());
  });

  describe("#07 => via type() — map", () => {
    const result = type(({ primitiveObject }) =>
      primitiveObject({ name: "string", age: "number" }),
    );

    test("#01 => value matches", () =>
      expect(result.type).toEqual({ name: "string", age: "number" }));

    test(`#02 => ${STANDARD_KEY}.version is 1`, () =>
      expect(result[STANDARD_KEY].version).toBe(1));

    test("#03 => validate() captures the value", () =>
      expect(result[STANDARD_KEY].validate("any")).toEqual({
        value: { name: "string", age: "number" },
      }));
  });

  describe("#08 => via type() — string literal", () => {
    const result = type(({ primitiveObject }) => primitiveObject("string"));

    test("#01 => value is string", () => expect(result.type).toBe("string"));
  });

  describe("#09 => via type() — number literal", () => {
    const result = type(({ primitiveObject }) => primitiveObject("number"));

    test("#01 => value is number string", () =>
      expect(result.type).toBe("number"));
  });

  describe("#10 => via type() — nested map", () => {
    const result = type(({ primitiveObject }) =>
      primitiveObject({ user: { name: "string", active: "boolean" } }),
    );

    test("#01 => value matches", () =>
      expect(result.type).toEqual({
        user: { name: "string", active: "boolean" },
      }));
  });

  describe("#11 => via type() — combined with optional", () => {
    const result = type(({ primitiveObject, optional }) => ({
      schema: primitiveObject({ name: "string", age: "number" }),
      label: optional("string"),
    }));

    test("#01 => value matches", () =>
      expect(result.type).toEqual({
        schema: { name: "string", age: "number" },
        label: "string",
      }));
  });

  test("#12 => Complex", () => {
    const allView = type(({ optional }) => ({
      id: "string",
      classe: optional("string"),
      staticClasse: optional("string"),
      parent: "string",
      content: optional("string"),
      name: optional("string"),
      label: optional("string"),
      value: optional("string"),
      component: "string",
    }));

    const context = pretype<PrimitiveObjectT>()(
      ({ array, optional, partial, omit, intersection }) => ({
        canvas: array("string"),
        views: array(allView.__type),
        dragging: optional(allView.__type),
        string: "string",
        selectedID: optional(allView.__type.id),
        strings: optional(array("string")),
        currentVersion: optional("string"),
        canvasZoom: "number",

        creating: optional(
          intersection(omit(allView.__type, "parent"), {
            parent: optional("string"),
          }),
        ),

        user: {
          name: "string",
          prefs: "any",
        },

        utilities: partial({
          rawUtility: "string",
          currents: array({
            utility: "string",
            active: "boolean",
          }),
        }),

        history: array({
          views: array(allView.__type),
          id: "string",
          timestamps: "number",
        }),
      }),
    );

    const output = {
      canvas: ["string"],
      views: [
        {
          id: "string",
          classe: "string",
          staticClasse: "string",
          parent: "string",
          content: "string",
          name: "string",
          label: "string",
          value: "string",
          component: "string",
        },
      ],
      dragging: {
        id: "string",
        classe: "string",
        staticClasse: "string",
        parent: "string",
        content: "string",
        name: "string",
        label: "string",
        value: "string",
        component: "string",
      },
      string: "string",
      selectedID: "string",
      strings: ["string"],
      currentVersion: "string",
      canvasZoom: "number",
      creating: [
        {
          id: "string",
          classe: "string",
          staticClasse: "string",
          parent: "string",
          content: "string",
          name: "string",
          label: "string",
          value: "string",
          component: "string",
        },
        {
          parent: "string",
        },
      ],
      user: {
        name: "string",
        prefs: "any",
      },
      utilities: {
        rawUtility: "string",
        currents: [
          {
            utility: "string",
            active: "boolean",
          },
        ],
      },
      history: [
        {
          views: [
            {
              id: "string",
              classe: "string",
              staticClasse: "string",
              parent: "string",
              content: "string",
              name: "string",
              label: "string",
              value: "string",
              component: "string",
            },
          ],
          id: "string",
          timestamps: "number",
        },
      ],
    };

    expect(context.type).toEqual(output);
    expect(context.__type).toEqual(output);
    expect(context["~standard"].types?.input).toEqual(output);
    expect(context["~standard"].types?.output).toEqual(output);
  });
});
