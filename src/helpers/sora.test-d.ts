import { type } from '../type';
import type { Sh, SoRa } from '../types';

// SoRa with string
const soraString = type(({ sora }) => ({
  value: sora('string'),
}));
expectTypeOf(soraString).toEqualTypeOf<
  Sh<{
    value: SoRa<string>;
  }>
>();

// SoRa with number
const soraNumber = type(({ sora }) => ({
  count: sora('number'),
}));
expectTypeOf(soraNumber).toEqualTypeOf<
  Sh<{
    count: SoRa<number>;
  }>
>();

// SoRa with boolean
const soraBoolean = type(({ sora }) => ({
  flag: sora('boolean'),
}));
expectTypeOf(soraBoolean).toEqualTypeOf<
  Sh<{
    flag: SoRa<boolean>;
  }>
>();

// SoRa with object
const soraObject = type(({ sora }) => ({
  item: sora({ name: 'string' }),
}));
expectTypeOf(soraObject).toEqualTypeOf<
  Sh<{
    item: SoRa<{ name: string }>;
  }>
>();

// SoRa with complex object
const soraComplex = type(({ sora }) => ({
  user: sora({ id: 'string', name: 'string', age: 'number' }),
}));
expectTypeOf(soraComplex).toEqualTypeOf<
  Sh<{
    user: SoRa<{ id: string; name: string; age: number }>;
  }>
>();
