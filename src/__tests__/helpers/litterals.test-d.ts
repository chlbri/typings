import { transform } from '../../transform';

// String literals
const litteralsString = transform(({ litterals }) => ({
  status: litterals('active', 'inactive', 'pending'),
}));
expectTypeOf(litteralsString).toEqualTypeOf<{
  status: 'active' | 'inactive' | 'pending';
}>();

// Number literals
const litteralsNumber = transform(({ litterals }) => ({
  priority: litterals(1, 2, 3),
}));
expectTypeOf(litteralsNumber).toEqualTypeOf<{
  priority: 1 | 2 | 3;
}>();

// Boolean literals
const litteralsBoolean = transform(({ litterals }) => ({
  flag: litterals(true, false),
}));
expectTypeOf(litteralsBoolean).toEqualTypeOf<{
  flag: true | false;
}>();

// Mixed literals
const litteralsMixed = transform(({ litterals }) => ({
  value: litterals('yes', 'no', 1, 0, true),
}));
expectTypeOf(litteralsMixed).toEqualTypeOf<{
  value: 'yes' | 'no' | 1 | 0 | true;
}>();

// Two string literals
const litteralsTwo = transform(({ litterals }) => ({
  direction: litterals('left', 'right'),
}));
expectTypeOf(litteralsTwo).toEqualTypeOf<{
  direction: 'left' | 'right';
}>();

// HTTP methods
const litteralsHttp = transform(({ litterals }) => ({
  method: litterals('GET', 'POST', 'PUT', 'DELETE'),
}));
expectTypeOf(litteralsHttp).toEqualTypeOf<{
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}>();
