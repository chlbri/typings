import { type } from "../type";

const _unknown = type();
expectTypeOf(_unknown).toEqualTypeOf<unknown>();

const _any1 = type(({ custom }) => custom());
expectTypeOf(_any1).toEqualTypeOf<any>();

const _any2 = type(({ any }) => any());
expectTypeOf(_any2).toEqualTypeOf<any>();
