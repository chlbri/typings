import { transform } from '../../transform';

// Partial object
const partialObject = transform(({ partial }) => ({
  user: partial({ name: 'string', age: 'number' }),
}));
expectTypeOf(partialObject).toEqualTypeOf<{
  user: Partial<{ name: string; age: number }>;
}>();

// Partial with single property
const partialSingle = transform(({ partial }) => ({
  config: partial({ enabled: 'boolean' }),
}));
expectTypeOf(partialSingle).toEqualTypeOf<{
  config: Partial<{ enabled: boolean }>;
}>();

// Partial with multiple properties
const partialMultiple = transform(({ partial }) => ({
  settings: partial({
    theme: 'string',
    fontSize: 'number',
    darkMode: 'boolean',
  }),
}));
expectTypeOf(partialMultiple).toEqualTypeOf<{
  settings: Partial<{
    theme: string;
    fontSize: number;
    darkMode: boolean;
  }>;
}>();

// Partial with nested object
const partialNested = transform(({ partial }) => ({
  data: partial({
    user: { name: 'string' },
    meta: { count: 'number' },
  }),
}));
expectTypeOf(partialNested).toEqualTypeOf<{
  data: Partial<{
    user: { name: string };
    meta: { count: number };
  }>;
}>();
