import { type } from '../type';

// Array of strings
const arrayString = type(({ array }) => ({
  tags: array('string'),
}));
expectTypeOf(arrayString).toEqualTypeOf<{ tags: string[] }>();

// Array of numbers
const arrayNumber = type(({ array }) => ({
  scores: array('number'),
}));
expectTypeOf(arrayNumber).toEqualTypeOf<{ scores: number[] }>();

// Array of booleans
const arrayBoolean = type(({ array }) => ({
  flags: array('boolean'),
}));
expectTypeOf(arrayBoolean).toEqualTypeOf<{ flags: boolean[] }>();

// Array of objects
const arrayObject = type(({ array }) => ({
  users: array({ name: 'string', age: 'number' }),
}));
expectTypeOf(arrayObject).toEqualTypeOf<{
  users: Array<{ name: string; age: number }>;
}>();

// Nested arrays
const nestedArray = type(({ array }) => ({
  matrix: array(array('number')),
}));
expectTypeOf(nestedArray).toEqualTypeOf<{ matrix: number[][] }>();

// Array with nested object
const arrayNestedObject = type(({ array }) => ({
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
