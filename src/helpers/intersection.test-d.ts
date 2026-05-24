import { type } from '../type';

// Intersection of two objects
const intersectionTwo = type(({ intersection }) => ({
  person: intersection({ name: 'string' }, { age: 'number' }),
}));
expectTypeOf(intersectionTwo.type).toEqualTypeOf<{
  person: { name: string; age: number };
}>();

// Intersection of three objects
const intersectionThree = type(({ intersection }) => ({
  entity: intersection(
    { id: 'string' },
    { name: 'string' },
    { createdAt: 'date' },
  ),
}));
expectTypeOf(intersectionThree.type).toEqualTypeOf<{
  entity: { id: string; name: string; createdAt: Date };
}>();

// Intersection with nested properties
const intersectionNested = type(({ intersection }) => ({
  data: intersection(
    { user: { name: 'string' } },
    { meta: { timestamp: 'number' } },
  ),
}));
expectTypeOf(intersectionNested.type).toEqualTypeOf<{
  data: {
    user: { name: string };
    meta: { timestamp: number };
  };
}>();

// Intersection of four objects
const intersectionFour = type(({ intersection }) => ({
  full: intersection(
    { a: 'string' },
    { b: 'number' },
    { c: 'boolean' },
    { d: 'date' },
  ),
}));
expectTypeOf(intersectionFour.type).toEqualTypeOf<{
  full: { a: string; b: number; c: boolean; d: Date };
}>();

// Complex intersection with arrays and any
const intersectionComplex = type(({ any, intersection, array }) => ({
  item: any(
    intersection(
      { id: 'string', tags: array('string') },
      { createdAt: 'date', active: 'boolean' },
    ),
  ),
}));
expectTypeOf(intersectionComplex.type).toEqualTypeOf<{
  item: {
    id: string;
    tags: string[];
    createdAt: Date;
    active: boolean;
  };
}>();

const pphoneNumber = type(({ optional }) => ({
  countryCode: 'number',
  number: 'string',
  network: optional('string'),
}));

const social = type({
  platform: 'string',
  url: 'string',
});

const intermediary = type(
  ({ intersection, optional, any, array, union, litterals, use }) =>
    intersection(
      {
        id: 'string',
        wallet: 'string',
        sacrifice: optional('number'),
        contacts: any({
          phoneNumbers: array(use(pphoneNumber)),
          emails: optional(array('string')),
          socials: optional(array(use(social))),
          websites: optional(array('string')),
        }),
      },
      union.discriminated(
        'personality',
        {
          personality: litterals('individual'),
          nationalID: 'string',
          name: any({
            firstName: optional('string'),
            lastName: optional('string'),
          }),
        },
        {
          personality: litterals('company'),
          companyName: 'string',
          registrationNumber: 'string',
        },
      ),
    ),
);

type TIntermediary = {
  id: string;
  wallet: string;
  sacrifice?: number;
  contacts: {
    phoneNumbers: {
      countryCode: number;
      number: string;
      network?: string;
    }[];
    emails?: string[];
    socials?: {
      platform: string;
      url: string;
    }[];
    websites?: string[];
  };
} & (
  | {
      personality: 'individual';
      nationalID: string;
      name?: {
        firstName?: string;
        lastName?: string;
      };
    }
  | {
      personality: 'company';
      companyName: string;
      registrationNumber: string;
    }
);

expectTypeOf(intermediary.type).branded.toEqualTypeOf<TIntermediary>();
