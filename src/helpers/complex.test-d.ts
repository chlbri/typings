import { type } from '../type';
import type { inferSh, Keys, Sh, SoA, StateValue } from '../types';

// Complex nested structure with array, optional, intersection
const complex1 = type(({ array, optional, intersection }) => ({
  nodes: optional(
    array(
      intersection(
        {
          position: {
            x: 'number',
            y: 'number',
          },
          data: {
            label: optional('string'),
            content: 'string',
          },
          input: 'boolean',
        },
        { id: 'string' },
      ),
    ),
  ),
}));

expectTypeOf(complex1).toEqualTypeOf<
  Sh<{
    nodes?:
      | {
          position: {
            x: number;
            y: number;
          };
          data: {
            label?: string;
            content: string;
          };
          input: boolean;
          id: string;
        }[]
      | undefined;
  }>
>();

// Complex form schema
const formSchema = type(
  ({ array, optional, union, litterals, custom }) => ({
    fields: array({
      name: 'string',
      type: litterals('text', 'number', 'select', 'checkbox'),
      required: 'boolean',
      options: optional(array('string')),
      validation: optional({
        min: optional('number'),
        max: 'number',
        pattern: optional(custom<RegExp>()),
      }),
    }),
    submitUrl: 'string',
    method: union('string', litterals('GET', 'POST', 'PUT', 'DELETE')),
  }),
);

expectTypeOf(formSchema).toEqualTypeOf<
  Sh<{
    fields: Array<{
      name: string;
      type: 'text' | 'number' | 'select' | 'checkbox';
      required: boolean;
      options?: string[];
      validation?: {
        min?: number;
        max: number;
        pattern?: RegExp;
      };
    }>;
    submitUrl: string;
    method: string | 'GET' | 'POST' | 'PUT' | 'DELETE';
  }>
>();

// API response schema
const apiResponse = type(({ array, optional, union, intersection }) => ({
  data: union(
    {
      success: 'boolean',
      items: array(
        intersection(
          { id: 'string', createdAt: 'date' },
          {
            name: 'string',
            metadata: optional({
              tags: optional(array('string')),
              priority: 'number',
            }),
          },
        ),
      ),
    },
    {
      success: 'boolean',
      error: { code: 'number', message: 'string' },
    },
  ),
  pagination: optional({
    page: 'number',
    total: 'number',
    hasMore: 'boolean',
  }),
}));

expectTypeOf(apiResponse).toEqualTypeOf<
  Sh<{
    data:
      | {
          success: boolean;
          items: Array<{
            id: string;
            createdAt: Date;
            name: string;
            metadata?: {
              tags?: string[];
              priority: number;
            };
          }>;
        }
      | {
          success: boolean;
          error: { code: number; message: string };
        };
    pagination?: {
      page: number;
      total: number;
      hasMore: boolean;
    };
  }>
>();

// Nested tuples and arrays
const nestedTuples = type(({ tuple, array, optional }) => ({
  coordinates: tuple('number', 'number', 'number'),
  path: array(tuple('number', 'number')),
  bounds: optional(tuple({ min: 'number' }, { max: 'number' })),
}));

expectTypeOf(nestedTuples).toEqualTypeOf<
  Sh<{
    coordinates: [number, number, number];
    path: Array<[number, number]>;
    bounds?: [{ min: number }, { max: number }];
  }>
>();

// Record with complex values
const recordComplex = type(({ record, optional, array }) => ({
  users: record(
    {
      profile: {
        firstName: 'string',
        lastName: 'string',
        avatar: optional('string'),
      },
      posts: array({
        title: 'string',
        content: 'string',
        published: 'boolean',
      }),
    },
    'admin',
    'editor',
    'viewer',
  ),
}));

expectTypeOf(recordComplex).toEqualTypeOf<
  Sh<{
    users: Record<
      'admin' | 'editor' | 'viewer',
      {
        profile: {
          firstName: string;
          lastName: string;
          avatar?: string;
        };
        posts: Array<{
          title: string;
          content: string;
          published: boolean;
        }>;
      }
    >;
  }>
>();

// All helpers combined
const allHelpers = type(
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
    anyValue: any('string'),
    items: array({ id: 'string' }),
    customData: custom<{ foo: string }>(),
    merged: intersection({ a: 'string' }, { b: 'number' }),
    status: litterals('on', 'off'),
    optional: optional('boolean'),
    partialObj: partial({ x: 'number', y: 'number' }),
    mapping: record('string', 'key1', 'key2'),
    mapping2: record('number'),
    single: soa('number'),
    stateValue: sv.type,
    coords: tuple('number', 'number'),
    choice: union('string', 'number'),
  }),
);

expectTypeOf(allHelpers).toEqualTypeOf<
  Sh<{
    anyValue: string;
    items: Array<{ id: string }>;
    customData: { foo: string };
    merged: { a: string; b: number };
    status: 'on' | 'off';
    optional?: boolean;
    partialObj: Partial<{ x: number; y: number }>;
    mapping: Record<'key1' | 'key2', string>;
    mapping2: Record<Keys, number>;
    single: SoA<number>;
    stateValue: StateValue;
    coords: [number, number];
    choice: string | number;
  }>
>();

// inferT: flat primitive object schema
type FlatPrimitiveSchema = inferSh<{
  name: 'string';
  age: 'number';
  active: 'boolean';
}>;
expectTypeOf<FlatPrimitiveSchema>().toEqualTypeOf<
  Sh<{
    name: string;
    age: number;
    active: boolean;
  }>
>();

// inferT: deeply nested schema
type DeepNestedSchema = inferSh<{
  user: {
    profile: { firstName: 'string'; lastName: 'string' };
    settings: { theme: 'string'; notifications: 'boolean' };
  };
}>;
expectTypeOf<DeepNestedSchema>().toEqualTypeOf<
  Sh<{
    user: {
      profile: { firstName: string; lastName: string };
      settings: { theme: string; notifications: boolean };
    };
  }>
>();

// inferT: primitiveObject combined with optional in type()
const typeWithPrimObj = type(({ primitiveObject, optional, array }) => ({
  config: primitiveObject({ host: 'string', port: 'number' }),
  tags: optional(array('string')),
}));
expectTypeOf(typeWithPrimObj).toEqualTypeOf<
  Sh<{
    config: { host: string; port: number };
    tags?: string[];
  }>
>();

// inferT: primitiveObject inside array in type()
const typeWithPrimObjArray = type(({ primitiveObject, array }) => ({
  items: array(primitiveObject({ id: 'string', value: 'number' })),
}));
expectTypeOf(typeWithPrimObjArray).branded.toEqualTypeOf<
  Sh<{
    items: Array<{ id: string; value: number }>;
  }>
>();

// inferT: primitiveObject inside intersection in type()
const typeWithPrimObjIntersection = type(
  ({ primitiveObject, intersection }) =>
    intersection(
      primitiveObject({ name: 'string' }),
      primitiveObject({ age: 'number' }),
    ),
);
expectTypeOf(typeWithPrimObjIntersection).toEqualTypeOf<
  Sh<{
    name: string;
    age: number;
  }>
>();
