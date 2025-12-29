import { transform } from '../../transform';

// Maybe string
const maybeString = transform(({ maybe }) => ({
  nickname: maybe('string'),
}));
expectTypeOf(maybeString).toEqualTypeOf<{ nickname?: string }>();

// Maybe number
const maybeNumber = transform(({ maybe }) => ({
  count: maybe('number'),
}));
expectTypeOf(maybeNumber).toEqualTypeOf<{ count?: number }>();

// Maybe boolean
const maybeBoolean = transform(({ maybe }) => ({
  active: maybe('boolean'),
}));
expectTypeOf(maybeBoolean).toEqualTypeOf<{ active?: boolean }>();

// Maybe object
const maybeObject = transform(({ maybe }) => ({
  address: maybe({ city: 'string', zip: 'number' }),
}));
expectTypeOf(maybeObject).toEqualTypeOf<{
  address?: { city: string; zip: number };
}>();

// Maybe array
const maybeArray = transform(({ maybe, array }) => ({
  items: maybe(array('string')),
}));
expectTypeOf(maybeArray).toEqualTypeOf<{ items?: string[] }>();

// Nested maybe
const nestedMaybe = transform(({ maybe }) => ({
  data: maybe({
    inner: maybe('string'),
  }),
}));
expectTypeOf(nestedMaybe).toEqualTypeOf<{
  data?: { inner?: string };
}>();

// Maybe with complex object
const maybeComplex = transform(({ maybe, array }) => ({
  user: maybe({
    name: 'string',
    tags: array('string'),
    profile: maybe({
      bio: 'string',
    }),
  }),
}));
expectTypeOf(maybeComplex).toEqualTypeOf<{
  user?: {
    name: string;
    tags: string[];
    profile?: { bio: string };
  };
}>();
