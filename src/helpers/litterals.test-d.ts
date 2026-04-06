import { type } from '../type';

// String literals
const litteralsString = type(({ litterals }) => ({
  status: litterals('active', 'inactive', 'pending'),
}));
expectTypeOf(litteralsString).toEqualTypeOf<{
  status: 'active' | 'inactive' | 'pending';
}>();

// Number literals
const litteralsNumber = type(({ litterals }) => ({
  priority: litterals(1, 2, 3),
}));
expectTypeOf(litteralsNumber).toEqualTypeOf<{
  priority: 1 | 2 | 3;
}>();

// Boolean literals
const litteralsBoolean = type(({ litterals }) => ({
  flag: litterals(true, false),
}));
expectTypeOf(litteralsBoolean).toEqualTypeOf<{
  flag: true | false;
}>();

// Mixed literals
const litteralsMixed = type(({ litterals }) => ({
  value: litterals('yes', 'no', 1, 0, true),
}));
expectTypeOf(litteralsMixed).toEqualTypeOf<{
  value: 'yes' | 'no' | 1 | 0 | true;
}>();

// Two string literals
const litteralsTwo = type(({ litterals }) => ({
  direction: litterals('left', 'right'),
}));
expectTypeOf(litteralsTwo).toEqualTypeOf<{
  direction: 'left' | 'right';
}>();

// HTTP methods
const litteralsHttp = type(({ litterals }) => ({
  method: litterals('GET', 'POST', 'PUT', 'DELETE'),
}));
expectTypeOf(litteralsHttp).toEqualTypeOf<{
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}>();
