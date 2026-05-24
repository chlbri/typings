import { type } from '../type';

const _defaultString = type(({ optional }) => optional('string'));
expectTypeOf(_defaultString.type).toEqualTypeOf<string | undefined>();

// optional string
const optionalString = type(({ optional }) => ({
  nickname: optional('string'),
}));
expectTypeOf(optionalString.type).toEqualTypeOf<{
  nickname?: string;
}>();

// optional number
const optionalNumber = type(({ optional }) => ({
  count: optional('number'),
}));
expectTypeOf(optionalNumber.type).toEqualTypeOf<{
  count?: number;
}>();

// optional boolean
const optionalBoolean = type(({ optional }) => ({
  active: optional('boolean'),
}));
expectTypeOf(optionalBoolean.type).toEqualTypeOf<{
  active?: boolean;
}>();

// optional object
const optionalObject = type(({ optional }) => ({
  address: optional({ city: 'string', zip: 'number' }),
}));
expectTypeOf(optionalObject.type).toEqualTypeOf<{
  address?: { city: string; zip: number };
}>();

// optional array
const optionalArray = type(({ optional, array }) => ({
  items: optional(array('string')),
}));
expectTypeOf(optionalArray.type).toEqualTypeOf<{
  items?: string[];
}>();

// Nested optional
const nestedoptional = type(({ optional }) => ({
  data: optional({
    inner: optional('string'),
  }),
}));
expectTypeOf(nestedoptional.type).toEqualTypeOf<{
  data?: { inner?: string };
}>();

// optional with complex object
const optionalComplex = type(({ optional, array }) => ({
  user: optional({
    name: 'string',
    tags: array('string'),
    profile: optional({
      bio: 'string',
    }),
  }),
}));
expectTypeOf(optionalComplex.type).toEqualTypeOf<{
  user?: {
    name: string;
    tags: string[];
    profile?: { bio: string };
  };
}>();
