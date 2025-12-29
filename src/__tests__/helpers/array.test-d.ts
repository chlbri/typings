import { transform } from '../../transform';

// Array of strings
const arrayString = transform(({ array }) => ({
  tags: array('string'),
}));
expectTypeOf(arrayString).toEqualTypeOf<{ tags: string[] }>();

// Array of numbers
const arrayNumber = transform(({ array }) => ({
  scores: array('number'),
}));
expectTypeOf(arrayNumber).toEqualTypeOf<{ scores: number[] }>();

// Array of booleans
const arrayBoolean = transform(({ array }) => ({
  flags: array('boolean'),
}));
expectTypeOf(arrayBoolean).toEqualTypeOf<{ flags: boolean[] }>();

// Array of objects
const arrayObject = transform(({ array }) => ({
  users: array({ name: 'string', age: 'number' }),
}));
expectTypeOf(arrayObject).toEqualTypeOf<{
  users: Array<{ name: string; age: number }>;
}>();

// Nested arrays
const nestedArray = transform(({ array }) => ({
  matrix: array(array('number')),
}));
expectTypeOf(nestedArray).toEqualTypeOf<{ matrix: number[][] }>();

// Array with nested object
const arrayNestedObject = transform(({ array }) => ({
  items: array({
    id: 'string',
    data: {
      value: 'number',
      label: 'string',
    },
  }),
}));
expectTypeOf(arrayNestedObject).toEqualTypeOf<{
  items: Array<{
    id: string;
    data: { value: number; label: string };
  }>;
}>();
