import { type } from '../type';
import type { Sh } from '../types';
import { any } from './any';
import { optional } from './optional';

// Intersection of two objects
const intersectionTwo = type(({ intersection }) => ({
  person: intersection({ name: 'string' }, { age: 'number' }),
}));
expectTypeOf(intersectionTwo).toEqualTypeOf<
  Sh<{
    person: { name: string; age: number };
  }>
>();

// Intersection of three objects
const intersectionThree = type(({ intersection }) => ({
  entity: intersection(
    { id: 'string' },
    { name: 'string' },
    { createdAt: 'date' },
  ),
}));
expectTypeOf(intersectionThree).toEqualTypeOf<
  Sh<{
    entity: { id: string; name: string; createdAt: Date };
  }>
>();

// Intersection with nested properties
const intersectionNested = type(({ intersection }) => ({
  data: intersection(
    { user: { name: 'string' } },
    { meta: { timestamp: 'number' } },
  ),
}));
expectTypeOf(intersectionNested).toEqualTypeOf<
  Sh<{
    data: {
      user: { name: string };
      meta: { timestamp: number };
    };
  }>
>();

// Intersection of four objects
const intersectionFour = type(({ intersection }) => ({
  full: intersection(
    { a: 'string' },
    { b: 'number' },
    { c: 'boolean' },
    { d: 'date' },
  ),
}));
expectTypeOf(intersectionFour).toEqualTypeOf<
  Sh<{
    full: { a: string; b: number; c: boolean; d: Date };
  }>
>();

// Complex intersection with arrays and any
const intersectionComplex = type(({ any, intersection, array }) => ({
  item: any(
    intersection(
      { id: 'string', tags: array('string') },
      { createdAt: 'date', active: 'boolean' },
    ),
  ),
}));
expectTypeOf(intersectionComplex).toEqualTypeOf<
  Sh<{
    item: {
      id: string;
      tags: string[];
      createdAt: Date;
      active: boolean;
    };
  }>
>();

const pphoneNumber = any({
  countryCode: 'number',
  number: 'string',
  network: optional('string'),
});

const social = any({
  platform: 'string',
  url: 'string',
});

const intermediary = type(
  ({ intersection, optional, any, array, union, litterals }) =>
    intersection(
      {
        id: 'string',
        wallet: 'string',
        sacrifice: optional('number'),
        contacts: any({
          phoneNumbers: array(pphoneNumber),
          emails: optional(array('string')),
          socials: optional(array(social)),
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

expectTypeOf(intermediary).branded.toEqualTypeOf<
  Sh<
    {
      id: string;
      wallet: string;
      sacrifice?: number | undefined;
      contacts: {
        phoneNumbers: {
          countryCode: number;
          number: string;
          network?: string | undefined;
        }[];
        emails?: string[] | undefined;
        socials?:
          | {
              platform: string;
              url: string;
            }[]
          | undefined;
        websites?: string[] | undefined;
      };
    } & (
      | {
          personality: 'individual';
          nationalID: string;
          name: {
            firstName?: string | undefined;
            lastName?: string | undefined;
          };
        }
      | {
          personality: 'company';
          companyName: string;
          registrationNumber: string;
        }
    )
  >
>();
