import type { SoA } from '../../types';
import { transform } from '../../transform';

// SoA with string
const soaString = transform(({ soa }) => ({
  value: soa('string'),
}));
expectTypeOf(soaString).toEqualTypeOf<{
  value: SoA<string>;
}>();

// SoA with number
const soaNumber = transform(({ soa }) => ({
  count: soa('number'),
}));
expectTypeOf(soaNumber).toEqualTypeOf<{
  count: SoA<number>;
}>();

// SoA with boolean
const soaBoolean = transform(({ soa }) => ({
  flag: soa('boolean'),
}));
expectTypeOf(soaBoolean).toEqualTypeOf<{
  flag: SoA<boolean>;
}>();

// SoA with object
const soaObject = transform(({ soa }) => ({
  item: soa({ name: 'string' }),
}));
expectTypeOf(soaObject).toEqualTypeOf<{
  item: SoA<{ name: string }>;
}>();

// SoA with complex object
const soaComplex = transform(({ soa }) => ({
  user: soa({ id: 'string', name: 'string', age: 'number' }),
}));
expectTypeOf(soaComplex).toEqualTypeOf<{
  user: SoA<{ id: string; name: string; age: number }>;
}>();
