import type {
  JSON_Primitive,
  Primitive,
  PrimitiveObject,
} from './types.types';

const not1 = {
  data: 'dodo',
  date: new Date(),
  num: 4,
};
expectTypeOf(not1).not.toExtend<PrimitiveObject>();

const date = new Date();
expectTypeOf(date).not.toExtend<PrimitiveObject>();

const obj = { name: 'Alice', age: 30 };
expectTypeOf(obj).toExtend<PrimitiveObject>();

const arr = [1, 2, 3];
expectTypeOf(arr).toExtend<PrimitiveObject>();

const nested = {
  user: { name: 'Bob', age: 25 },
  tags: ['admin', 'editor'],
};
expectTypeOf(nested).toExtend<PrimitiveObject>();

const emptyObj = {};
expectTypeOf(emptyObj).toExtend<PrimitiveObject>();
expectTypeOf(emptyObj).not.toExtend<JSON_Primitive>();
expectTypeOf(emptyObj).not.toExtend<Primitive>();

const emptyArr: unknown[] = [];
expectTypeOf(emptyArr).not.toExtend<PrimitiveObject>();

const str = 'hello';
expectTypeOf(str).toExtend<PrimitiveObject>();
expectTypeOf(str).toExtend<JSON_Primitive>();

const num = 42;
expectTypeOf(num).toExtend<PrimitiveObject>();
expectTypeOf(num).toExtend<JSON_Primitive>();
expectTypeOf(num).toExtend<Primitive>();

const bool = true;
expectTypeOf(bool).toExtend<PrimitiveObject>();
expectTypeOf(bool).toExtend<JSON_Primitive>();
expectTypeOf(bool).toExtend<Primitive>();

const undef = undefined;
expectTypeOf(undef).toExtend<PrimitiveObject>();
expectTypeOf(undef).toExtend<JSON_Primitive>();
expectTypeOf(undef).toExtend<Primitive>();

const nul = null;
expectTypeOf(nul).not.toExtend<PrimitiveObject>();
expectTypeOf(nul).not.toExtend<JSON_Primitive>();
expectTypeOf(nul).toExtend<Primitive>();

const sym = Symbol('sym');
expectTypeOf(sym).not.toExtend<PrimitiveObject>();
expectTypeOf(sym).not.toExtend<JSON_Primitive>();
expectTypeOf(sym).toExtend<Primitive>();

const bigInt = BigInt(123598597887);
expectTypeOf(bigInt).not.toExtend<PrimitiveObject>();
expectTypeOf(bigInt).not.toExtend<JSON_Primitive>();
expectTypeOf(bigInt).toExtend<Primitive>();

const func = () => {};
expectTypeOf(func).not.toExtend<PrimitiveObject>();

const neverVal = () => {
  throw new Error('This should never happen');
};
expectTypeOf(neverVal()).not.toExtend<PrimitiveObject>();
expectTypeOf(neverVal()).not.toExtend<JSON_Primitive>();
expectTypeOf(neverVal()).not.toExtend<Primitive>();
expectTypeOf(neverVal()).toEqualTypeOf<never>();
