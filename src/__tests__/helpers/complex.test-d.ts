import type { Keys, SoA, StateValue } from '../../types';
import { transform } from '../../transform';

// Complex nested structure with array, maybe, intersection
const complex1 = transform(({ array, maybe, intersection }) => ({
  nodes: maybe(
    array(
      intersection(
        {
          position: {
            x: 'number',
            y: 'number',
          },
          data: {
            label: maybe('string'),
            content: 'string',
          },
          input: 'boolean',
        },
        { id: 'string' },
      ),
    ),
  ),
}));

expectTypeOf(complex1).toEqualTypeOf<{
  nodes?: Array<{
    position: { x: number; y: number };
    data: { label?: string; content: string };
    input: boolean;
    id: string;
  }>;
}>();

// Complex form schema
const formSchema = transform(
  ({ array, maybe, union, litterals, custom }) => ({
    fields: array({
      name: 'string',
      type: litterals('text', 'number', 'select', 'checkbox'),
      required: 'boolean',
      options: maybe(array('string')),
      validation: maybe({
        min: maybe('number'),
        max: maybe('number'),
        pattern: maybe(custom<RegExp>()),
      }),
    }),
    submitUrl: 'string',
    method: union('string', litterals('GET', 'POST', 'PUT', 'DELETE')),
  }),
);

expectTypeOf(formSchema).toEqualTypeOf<{
  fields: Array<{
    name: string;
    type: 'text' | 'number' | 'select' | 'checkbox';
    required: boolean;
    options?: string[];
    validation?: {
      min?: number;
      max?: number;
      pattern?: RegExp;
    };
  }>;
  submitUrl: string;
  method: string | 'GET' | 'POST' | 'PUT' | 'DELETE';
}>();

// API response schema
const apiResponse = transform(({ array, maybe, union, intersection }) => ({
  data: union(
    {
      success: 'boolean',
      items: array(
        intersection(
          { id: 'string', createdAt: 'date' },
          {
            name: 'string',
            metadata: maybe({
              tags: maybe(array('string')),
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
  pagination: maybe({
    page: 'number',
    total: 'number',
    hasMore: 'boolean',
  }),
}));

expectTypeOf(apiResponse).toEqualTypeOf<{
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
}>();

// Nested tuples and arrays
const nestedTuples = transform(({ tuple, array, maybe }) => ({
  coordinates: tuple('number', 'number', 'number'),
  path: array(tuple('number', 'number')),
  bounds: maybe(tuple({ min: 'number' }, { max: 'number' })),
}));

expectTypeOf(nestedTuples).toEqualTypeOf<{
  coordinates: [number, number, number];
  path: Array<[number, number]>;
  bounds?: [{ min: number }, { max: number }];
}>();

// Record with complex values
const recordComplex = transform(({ record, maybe, array }) => ({
  users: record(
    {
      profile: {
        firstName: 'string',
        lastName: 'string',
        avatar: maybe('string'),
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

expectTypeOf(recordComplex).toEqualTypeOf<{
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
}>();

// All helpers combined
const allHelpers = transform(
  ({
    any,
    array,
    custom,
    intersection,
    litterals,
    maybe,
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
    optional: maybe('boolean'),
    partialObj: partial({ x: 'number', y: 'number' }),
    mapping: record('string', 'key1', 'key2'),
    mapping2: record('number'),
    single: soa('number'),
    stateValue: sv,
    coords: tuple('number', 'number'),
    choice: union('string', 'number'),
  }),
);

expectTypeOf(allHelpers).toEqualTypeOf<{
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
}>();
