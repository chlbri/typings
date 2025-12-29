import { transform } from '../../transform';

// Intersection of two objects
const intersectionTwo = transform(({ intersection }) => ({
  person: intersection({ name: 'string' }, { age: 'number' }),
}));
expectTypeOf(intersectionTwo).toEqualTypeOf<{
  person: { name: string; age: number };
}>();

// Intersection of three objects
const intersectionThree = transform(({ intersection }) => ({
  entity: intersection(
    { id: 'string' },
    { name: 'string' },
    { createdAt: 'date' },
  ),
}));
expectTypeOf(intersectionThree).toEqualTypeOf<{
  entity: { id: string; name: string; createdAt: Date };
}>();

// Intersection with nested properties
const intersectionNested = transform(({ intersection }) => ({
  data: intersection(
    { user: { name: 'string' } },
    { meta: { timestamp: 'number' } },
  ),
}));
expectTypeOf(intersectionNested).toEqualTypeOf<{
  data: {
    user: { name: string };
    meta: { timestamp: number };
  };
}>();

// Intersection of four objects
const intersectionFour = transform(({ intersection }) => ({
  full: intersection(
    { a: 'string' },
    { b: 'number' },
    { c: 'boolean' },
    { d: 'date' },
  ),
}));
expectTypeOf(intersectionFour).toEqualTypeOf<{
  full: { a: string; b: number; c: boolean; d: Date };
}>();

// Complex intersection with arrays
const intersectionComplex = transform(({ intersection, array }) => ({
  item: intersection(
    { id: 'string', tags: array('string') },
    { createdAt: 'date', active: 'boolean' },
  ),
}));
expectTypeOf(intersectionComplex).toEqualTypeOf<{
  item: {
    id: string;
    tags: string[];
    createdAt: Date;
    active: boolean;
  };
}>();
