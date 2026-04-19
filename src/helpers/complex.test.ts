import { ARRAY, SOA } from "../constants";
import { type } from "../type";

describe("Transform: Complex scenarios", () => {
  it("#01 => Complex nested structure with array, optional, intersection", () => {
    const result = type(({ array, optional, intersection }) => ({
      nodes: optional(
        array(
          intersection(
            {
              position: {
                x: "number",
                y: "number",
              },
              data: {
                label: optional("string"),
                content: "string",
              },
              input: "boolean",
            },
            { id: "string" },
          ),
        ),
      ),
    }));

    expect(result).toEqual({
      nodes: {
        [ARRAY]: {
          data: {
            content: undefined,
            label: undefined,
          },
          id: undefined,
          input: undefined,
          position: {
            x: undefined,
            y: undefined,
          },
        },
      },
    });
  });

  it("#02 => Complex form schema", () => {
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

    expect(result).toEqual({
      fields: {
        [ARRAY]: {
          name: undefined,
          type: undefined,
          required: undefined,
          options: { [ARRAY]: undefined },
          validation: {
            max: undefined,
            min: undefined,
            pattern: {},
          },
        },
      },
      submitUrl: undefined,
      method: undefined,
    });
  });

  it("#03 => API response schema", () => {
    const result = type(({ array, optional, union, intersection }) => ({
      data: union(
        {
          success: "boolean",
          items: array(
            intersection(
              { id: "string", createdAt: "date" },
              {
                name: "string",
                metadata: optional({
                  tags: optional(array("string")),
                  priority: "number",
                }),
              },
            ),
          ),
        },
        {
          success: "boolean",
          error: { code: "number", message: "string" },
        },
      ),
      pagination: optional({
        page: "number",
        total: "number",
        hasMore: "boolean",
      }),
    }));

    expect(result).toEqual({
      data: {
        items: {
          "$$app-ts => array$$": {
            createdAt: undefined,
            id: undefined,
            metadata: {
              priority: undefined,
              tags: {
                "$$app-ts => array$$": undefined,
              },
            },
            name: undefined,
          },
        },
        success: undefined,
      },
      pagination: {
        hasMore: undefined,
        page: undefined,
        total: undefined,
      },
    });
  });

  it("#04 => Nested tuples and arrays", () => {
    const result = type(({ tuple, array, optional }) => ({
      coordinates: tuple("number", "number", "number"),
      path: array(tuple("number", "number")),
      bounds: optional(tuple({ min: "number" }, { max: "number" })),
    }));

    expect(result).toEqual({
      bounds: [{ min: undefined }, { max: undefined }],
      coordinates: [undefined, undefined, undefined],
      path: {
        "$$app-ts => array$$": [undefined, undefined],
      },
    });
  });

  it("#05 => Record with complex values", () => {
    const result = type(({ record, optional, array }) => ({
      users: record(
        {
          profile: {
            firstName: "string",
            lastName: "string",
            avatar: optional("string"),
          },
          posts: array({
            title: "string",
            content: "string",
            published: "boolean",
          }),
        },
        "admin",
        "editor",
        "viewer",
      ),
    }));

    expect(result).toEqual({
      users: {
        admin: {
          profile: {},
          posts: { [ARRAY]: {} },
        },
        editor: {
          profile: {},
          posts: { [ARRAY]: {} },
        },
        viewer: {
          profile: {},
          posts: { [ARRAY]: {} },
        },
      },
    });
  });

  it("#06 => All helpers combined", () => {
    const result = type(
      ({
        any,
        array,
        custom,
        intersection,
        litterals,
        optional,
        partial,
        record,
        soa,
        sv,
        tuple,
        union,
      }) => ({
        anyValue: any("string"),
        items: array({ id: "string" }),
        customData: custom<{ foo: string }>(),
        merged: intersection({ a: "string" }, { b: "number" }),
        status: litterals("on", "off"),
        optional: optional("boolean"),
        partialObj: partial({ x: "number", y: "number" }),
        mapping: record("string", "key1", "key2"),
        mapping2: record("number"),
        single: soa("number"),
        stateValue: sv,
        coords: tuple("number", "number"),
        choice: union("string", "number"),
      }),
    );

    expect(result).toEqual({
      anyValue: undefined,
      choice: undefined,
      coords: [undefined, undefined],
      customData: {},
      items: {
        "$$app-ts => array$$": {
          id: undefined,
        },
      },
      mapping: {
        key1: undefined,
        key2: undefined,
      },
      mapping2: {},
      merged: {
        a: undefined,
        b: undefined,
      },
      optional: undefined,
      partialObj: {
        x: undefined,
        y: undefined,
      },
      single: { [SOA]: undefined },
      stateValue: {},
      status: undefined,
    });
  });

  it("#07 => primitiveObject map combined with optional and array", () => {
    const result = type(({ primitiveObject, optional, array }) => ({
      config: primitiveObject({ host: "string", port: "number" }),
      tags: optional(array("string")),
    }));

    expect(result).toEqual({
      config: { host: undefined, port: undefined },
      tags: { [ARRAY]: undefined },
    });
  });

  it("#08 => primitiveObject inside array", () => {
    const result = type(({ primitiveObject, array }) => ({
      items: array(primitiveObject({ id: "string", value: "number" })),
    }));

    expect(result).toEqual({
      items: { [ARRAY]: { id: undefined, value: undefined } },
    });
  });

  it("#09 => primitiveObject inside intersection", () => {
    const result = type(({ primitiveObject, intersection }) =>
      intersection(
        primitiveObject({ name: "string" }),
        primitiveObject({ age: "number" }),
      ),
    );

    expect(result).toEqual({ name: undefined, age: undefined });
  });

  it("#10 => primitiveObject nested map via type()", () => {
    const result = type(({ primitiveObject }) =>
      primitiveObject({ user: { name: "string", active: "boolean" } }),
    );

    expect(result).toEqual({
      user: { name: undefined, active: undefined },
    });
  });
});
