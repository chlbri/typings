import { type } from '../type';
import type { SoRa } from '../types';

// SoRa with string
const soraString = type(({ sora }) => ({
  value: sora('string'),
}));
expectTypeOf(soraString.type).toEqualTypeOf<{
  value: SoRa<string>;
}>();

// SoRa with number
const soraNumber = type(({ sora }) => ({
  count: sora('number'),
}));
expectTypeOf(soraNumber.type).toEqualTypeOf<{
  count: SoRa<number>;
}>();

// SoRa with boolean
const soraBoolean = type(({ sora }) => ({
  flag: sora('boolean'),
}));
expectTypeOf(soraBoolean.type).toEqualTypeOf<{
  flag: SoRa<boolean>;
}>();

// SoRa with object
const soraObject = type(({ sora }) => ({
  item: sora({ name: 'string' }),
}));
expectTypeOf(soraObject.type).toEqualTypeOf<{
  item: SoRa<{ name: string }>;
}>();

// SoRa with complex object
const soraComplex = type(({ sora }) => ({
  user: sora({ id: 'string', name: 'string', age: 'number' }),
}));
expectTypeOf(soraComplex.type).toEqualTypeOf<{
  user: SoRa<{ id: string; name: string; age: number }>;
}>();
