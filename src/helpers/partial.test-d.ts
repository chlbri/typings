import { type } from '../type';

// Partial object
const partialObject = type(({ partial }) => ({
  user: partial({ name: 'string', age: 'number' }),
}));
expectTypeOf(partialObject.type).toEqualTypeOf<{
  user: Partial<{ name: string; age: number }>;
}>();

// Partial with single property
const partialSingle = type(({ partial }) => ({
  config: partial({ enabled: 'boolean' }),
}));
expectTypeOf(partialSingle.type).toEqualTypeOf<{
  config: Partial<{ enabled: boolean }>;
}>();

// Partial with multiple properties
const partialMultiple = type(({ partial }) => ({
  settings: partial({
    theme: 'string',
    fontSize: 'number',
    darkMode: 'boolean',
  }),
}));
expectTypeOf(partialMultiple.type).toEqualTypeOf<{
  settings: Partial<{
    theme: string;
    fontSize: number;
    darkMode: boolean;
  }>;
}>();

// Partial with nested object
const partialNested = type(({ partial }) => ({
  data: partial({
    user: { name: 'string' },
    meta: { count: 'number' },
  }),
}));
expectTypeOf(partialNested.type).toEqualTypeOf<{
  data: Partial<{
    user: { name: string };
    meta: { count: number };
  }>;
}>();
