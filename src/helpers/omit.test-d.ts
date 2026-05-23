import { type } from '../type';

// Test 1: omit with string key
const result1 = type(({ omit }) =>
  omit({ name: 'string', age: 'number', email: 'string' }, 'email'),
);
expectTypeOf<{
  name: string;
  age: number;
}>(result1.type);

// Test 2: omit with const key
const result2 = type(({ omit }) => {
  const obj = { user: 'string', status: 'boolean', id: 'number' } as const;
  return omit(obj, 'id' as const);
});
expectTypeOf<{
  user: string;
  status: boolean;
}>(result2.type);

// Test 3: omit.const with type information
