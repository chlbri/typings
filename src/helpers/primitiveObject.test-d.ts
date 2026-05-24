import { pretype, type } from '../type';
import type {
  EmptyObject,
  inferSh,
  inferT,
  NotReadonly,
  PrimitiveObjectMapS,
  PrimitiveObjectT,
} from '../types';
import { primitiveObject } from './primitiveObject';

// No argument — defaults to PrimitiveObjectS
const noArg = primitiveObject();
expectTypeOf(noArg).toEqualTypeOf<NotReadonly<PrimitiveObjectT>>();

const noMapArg = primitiveObject.map();
expectTypeOf(noMapArg).toEqualTypeOf<PrimitiveObjectMapS>();

// Primitive type string literal
const withString = primitiveObject('string');
expectTypeOf(withString).toEqualTypeOf<'string'>();

// Primitive type number literal
const withNumber = primitiveObject('number');
expectTypeOf(withNumber).toEqualTypeOf<'number'>();

// PrimitiveObjectMapS
const withMap = primitiveObject({ name: 'string', age: 'number' });
expectTypeOf(withMap).toEqualTypeOf<{ name: 'string'; age: 'number' }>();

// Nested PrimitiveObjectMapS
const withNested = primitiveObject({
  user: { name: 'string', active: 'boolean' },
});
expectTypeOf(withNested).toEqualTypeOf<{
  user: {
    name: 'string';
    active: 'boolean';
  };
}>();

// .map() — defaults to PrimitiveObjectMapS
const mapResult = primitiveObject.map();
expectTypeOf(mapResult).toEqualTypeOf<PrimitiveObjectMapS>();

// inferT: flat map transformation
type FlatMapT = inferSh<{ name: 'string'; age: 'number' }>;
expectTypeOf<FlatMapT['type']>().toEqualTypeOf<{
  name: string;
  age: number;
}>();

// inferT: nested map transformation
type NestedMapT = inferSh<{ user: { name: 'string'; active: 'boolean' } }>;
expectTypeOf<NestedMapT['type']>().toEqualTypeOf<{
  user: { name: string; active: boolean };
}>();

// inferT: from primitiveObject schema variable
const schemaVar = primitiveObject({ id: 'string', score: 'number' });
type SchemaVarT = inferSh<typeof schemaVar>;
expectTypeOf<SchemaVarT['type']>().toEqualTypeOf<{
  id: string;
  score: number;
}>();

// inferT: multi-field primitive schema variable
const multiFieldSchema = primitiveObject({
  name: 'string',
  age: 'number',
  active: 'boolean',
});
type MultiFieldT = inferSh<typeof multiFieldSchema>;
expectTypeOf<MultiFieldT['type']>().toEqualTypeOf<{
  name: string;
  age: number;
  active: boolean;
}>();

// type() with primitiveObject: flat map
const typeWithFlatMap = type(({ primitiveObject }) =>
  primitiveObject({ name: 'string', age: 'number' }),
);
expectTypeOf(typeWithFlatMap.type).toEqualTypeOf<{
  name: string;
  age: number;
}>();

// type() with primitiveObject: primitive string
const typeWithPrimitiveString = type(({ primitiveObject }) =>
  primitiveObject('string'),
);
expectTypeOf(typeWithPrimitiveString.type).toEqualTypeOf<string>();

// type() with primitiveObject: primitive number
const typeWithPrimitiveNumber = type(({ primitiveObject }) =>
  primitiveObject('number'),
);
expectTypeOf(typeWithPrimitiveNumber.type).toEqualTypeOf<number>();

// type() with primitiveObject: nested map
const typeWithNested = type(({ primitiveObject }) =>
  primitiveObject({ user: { name: 'string', active: 'boolean' } }),
);
expectTypeOf(typeWithNested.type).toEqualTypeOf<{
  user: {
    name: string;
    active: boolean;
  };
}>();

const typeWithNested2 = type(({ primitiveObject, partial }) =>
  primitiveObject({
    user: { name: 'string', active: 'boolean' },
    data: partial({ info: 'string' }),
  }),
);

expectTypeOf(typeWithNested2.type).toEqualTypeOf<{
  user: {
    name: string;
    active: boolean;
  };
  data: {
    info?: string;
  };
}>();

// type() with primitiveObject: combined with other helpers
const typeWithCombined = type(({ primitiveObject, optional }) => ({
  schema: primitiveObject({ name: 'string', age: 'number' }),
  label: optional('string'),
}));
expectTypeOf(typeWithCombined.type).toEqualTypeOf<{
  schema: { name: string; age: number };
  label?: string;
}>();

//union
const unionWithPrimitiveObject = type(({ primitiveObject, union }) =>
  union(
    primitiveObject(union({ name: 'string' }, 'boolean')),
    primitiveObject({ age: 'number' }),
  ),
);
type TU1 = inferT<typeof unionWithPrimitiveObject>;
expectTypeOf<TU1>().toEqualTypeOf<
  | boolean
  | {
      name: string;
    }
  | {
      age: number;
    }
>();

const allView = type(({ optional }) => ({
  id: 'string',
  classe: optional('string'),
  staticClasse: optional('string'),
  parent: 'string',
  content: optional('string'),
  name: optional('string'),
  label: optional('string'),
  value: optional('string'),
  component: 'string',
}));

const context = pretype(
  type(({ primitiveObject }) => primitiveObject.const),
)(({ array, optional, partial, omit, intersection }) => ({
  canvas: array('string'),
  views: array(allView.__type),
  dragging: optional(allView.__type),
  string: 'string',
  selectedID: optional(allView.__type.id),
  strings: optional(array('string')),
  currentVersion: optional('string'),
  canvasZoom: 'number',

  creating: optional(
    intersection(omit(allView.__type, 'parent'), {
      parent: optional('string'),
    }),
  ),

  user: {
    name: 'string',
    prefs: {},
  },

  utilities: partial({
    rawUtility: 'string',
    currents: array({
      utility: 'string',
      active: 'boolean',
    }),
  }),

  history: array({
    views: array(allView.__type),
    id: 'string',
    timestamps: 'number',
  }),
}));

context.type.user.prefs;

type(() => ({})).type;

expectTypeOf(context.type).toEqualTypeOf<{
  canvas: string[];
  views: {
    id: string;
    parent: string;
    component: string;
    classe?: string | undefined;
    staticClasse?: string | undefined;
    content?: string | undefined;
    name?: string | undefined;
    label?: string | undefined;
    value?: string | undefined;
  }[];
  string: string;
  canvasZoom: number;
  user: {
    name: string;
    prefs: EmptyObject;
  };
  utilities: {
    rawUtility?: string | undefined;
    currents?:
      | {
          utility: string;
          active: boolean;
        }[]
      | undefined;
  };
  history: {
    views: {
      id: string;
      parent: string;
      component: string;
      classe?: string | undefined;
      staticClasse?: string | undefined;
      content?: string | undefined;
      name?: string | undefined;
      label?: string | undefined;
      value?: string | undefined;
    }[];
    id: string;
    timestamps: number;
  }[];
  dragging?:
    | {
        id: string;
        parent: string;
        component: string;
        classe?: string | undefined;
        staticClasse?: string | undefined;
        content?: string | undefined;
        name?: string | undefined;
        label?: string | undefined;
        value?: string | undefined;
      }
    | undefined;
  creating?:
    | {
        id: string;
        component: string;
        parent?: string | undefined;
        classe?: string | undefined;
        staticClasse?: string | undefined;
        content?: string | undefined;
        name?: string | undefined;
        label?: string | undefined;
        value?: string | undefined;
      }
    | undefined;
  selectedID?: string | undefined;
  strings?: string[] | undefined;
  currentVersion?: string | undefined;
}>();

const _stringContext = pretype(
  type(({ litterals }) => litterals('string', 'number')),
);

const stringContext1 = _stringContext.type(({ litterals }) =>
  litterals('string'),
);
expectTypeOf(stringContext1.type).toEqualTypeOf<'string'>();

const stringContext2 = _stringContext.type(({ litterals }) => litterals());
expectTypeOf(stringContext2.type).toEqualTypeOf<never>();

const stringContext3 = _stringContext.type();
expectTypeOf(stringContext3.type).toEqualTypeOf<'string' | 'number'>();

// @ts-expect-error - 'string' is not assignable to constant type '"string" | "number"'
const stringContext4 = _stringContext.type('string');
expectTypeOf(stringContext4.type).toEqualTypeOf<'string' | 'number'>();

const pDefault = type(({ primitiveObject }) => primitiveObject.const);
expectTypeOf(pDefault.type);
