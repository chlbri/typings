import { ARRAY } from '../constants';
import { tuple as _tuple } from '../helpers';
import { transform } from '../transform';

describe('Transform function', () => {
  describe('Primitive types', () => {
    it('#01 => should transform string primitive', () => {
      const result = transform(() => ({ name: 'string' }));
      expect(result).toEqual({ name: undefined });
    });

    it('#02 => should transform number primitive', () => {
      const result = transform(() => ({ age: 'number' }));
      expect(result).toEqual({ age: undefined });
    });

    it('#03 => should transform boolean primitive', () => {
      const result = transform(() => ({ active: 'boolean' }));
      expect(result).toEqual({ active: undefined });
    });

    it('#04 => should transform null primitive', () => {
      const result = transform(() => ({ value: 'null' }));
      expect(result).toEqual({ value: undefined });
    });

    it('#05 => should transform undefined primitive', () => {
      const result = transform(() => ({ value: 'undefined' }));
      expect(result).toEqual({ value: undefined });
    });

    it('#06 => should transform symbol primitive', () => {
      const result = transform(() => ({ sym: 'symbol' }));
      expect(result).toEqual({ sym: undefined });
    });

    it('#07 => should transform date type', () => {
      const result = transform(() => ({ createdAt: 'date' }));
      expect(result).toEqual({ createdAt: undefined });
    });

    it('#08 => should transform primitive type', () => {
      const result = transform(() => ({ value: 'primitive' }));
      expect(result).toEqual({ value: {} });
    });
  });

  describe('Helper: any', () => {
    it('#01 => should handle any helper with string', () => {
      const result = transform(({ any }) => ({
        value: any('string'),
      }));
      expect(result).toEqual({ value: undefined });
    });

    it('#02 => should handle any helper with object', () => {
      const result = transform(({ any }) => ({
        data: any({ name: 'string', age: 'number' }),
      }));
      expect(result).toEqual({
        data: {
          age: undefined,
          name: undefined,
        },
      });
    });
  });

  describe('Helper: custom', () => {
    it('#01 => should handle custom type', () => {
      const result = transform(({ custom }) => ({
        value: custom<number>(),
      }));
      expect(result).toEqual({ value: {} });
    });

    it('#02 => should handle custom type with value', () => {
      const result = transform(({ custom }) => ({
        value: custom('test'),
      }));
      expect(result).toEqual({ value: {} });
    });

    it('#03 => should return empty object for custom only', () => {
      const result = transform(({ custom }) => custom<string>());
      expect(result).toEqual({});
    });
  });

  describe('Helper: array', () => {
    it('#01 => should transform array of strings', () => {
      const result = transform(({ array }) => ({
        tags: array('string'),
      }));
      expect(result).toEqual({ tags: { [ARRAY]: undefined } });
    });

    it('#02 => should transform array of objects', () => {
      const result = transform(({ array }) => ({
        users: array({ name: 'string', age: 'number' }),
      }));
      expect(result).toEqual({
        users: { [ARRAY]: { name: undefined, age: undefined } },
      });
    });

    it('#03 => should transform nested arrays', () => {
      const result = transform(({ array }) => ({
        matrix: array(array('number')),
      }));
      expect(result).toEqual({
        matrix: { [ARRAY]: { [ARRAY]: undefined } },
      });
    });
  });

  describe('Helper: maybe', () => {
    it('#01 => should transform maybe string', () => {
      const result = transform(({ maybe }) => ({
        nickname: maybe('string'),
      }));
      expect(result).toEqual({ nickname: undefined });
    });

    it('#02 => should transform maybe object', () => {
      const result = transform(({ maybe }) => ({
        address: maybe({ city: 'string', zip: 'number' }),
      }));
      expect(result).toEqual({
        address: { city: undefined, zip: undefined },
      });
    });

    it('#03 => should transform maybe array', () => {
      const result = transform(({ maybe, array }) => ({
        items: maybe(array('string')),
      }));
      expect(result).toEqual({ items: { [ARRAY]: undefined } });
    });
  });

  describe('Helper: tuple', () => {
    it('#01 => should correctly create tuple', () => {
      expect(_tuple('string', 'boolean')).toEqual(['string', 'boolean']);
    });

    it('#02 => should transform tuple of primitives', () => {
      const result = transform(({ tuple }) => ({
        coordinates: tuple('number', 'number'),
      }));
      expect(result).toEqual({ coordinates: [undefined, undefined] });
    });

    it('#03 => should transform tuple with mixed types', () => {
      const result = transform(({ tuple }) => ({
        pair: tuple('string', 'number', 'boolean'),
      }));
      expect(result).toEqual({ pair: [undefined, undefined, undefined] });
    });

    it('#04 => should transform tuple with objects', () => {
      const result = transform(({ tuple }) => ({
        data: tuple({ name: 'string' }, { age: 'number' }),
      }));
      expect(result).toEqual({
        data: [{ name: undefined }, { age: undefined }],
      });
    });
  });

  describe('Helper: union', () => {
    it('#01 => should handle union of primitives', () => {
      const result = transform(({ union }) => ({
        value: union('string', 'number'),
      }));
      expect(result).toEqual({ value: undefined });
    });

    it('#02 => should handle union of objects', () => {
      const result = transform(({ union }) => ({
        item: union({ type: 'string' }, { value: 'number' }),
      }));
      expect(result).toEqual({ item: { type: undefined } });
    });

    it('#03 => should handle discriminated union', () => {
      const result = transform(({ union }) => ({
        event: union.discriminated(
          'type',
          { type: 'string', name: 'string' },
          { type: 'string', count: 'number' },
        ),
      }));
      expect(result).toEqual({
        event: { type: undefined, name: undefined },
      });
    });
  });

  describe('Helper: intersection', () => {
    it('#01 => should merge two objects', () => {
      const result = transform(({ intersection }) => ({
        person: intersection({ name: 'string' }, { age: 'number' }),
      }));
      expect(result).toEqual({
        person: { name: undefined, age: undefined },
      });
    });

    it('#02 => should merge multiple objects', () => {
      const result = transform(({ intersection }) => ({
        entity: intersection(
          { id: 'string' },
          { name: 'string' },
          { createdAt: 'date' },
        ),
      }));
      expect(result).toEqual({
        entity: { id: undefined, name: undefined, createdAt: undefined },
      });
    });
  });

  describe('Helper: litterals', () => {
    it('#01 => should handle string literals', () => {
      const result = transform(({ litterals }) => ({
        status: litterals('active', 'inactive', 'pending'),
      }));
      expect(result).toEqual({ status: undefined });
    });

    it('#02 => should handle number literals', () => {
      const result = transform(({ litterals }) => ({
        priority: litterals(1, 2, 3),
      }));
      expect(result).toEqual({ priority: undefined });
    });

    it('#03 => should handle boolean literals', () => {
      const result = transform(({ litterals }) => ({
        flag: litterals(true, false),
      }));
      expect(result).toEqual({ flag: undefined });
    });

    it('#04 => should handle mixed literals', () => {
      const result = transform(({ litterals }) => ({
        value: litterals('yes', 'no', 1, 0, true),
      }));
      expect(result).toEqual({ value: undefined });
    });
  });

  describe('Helper: partial', () => {
    it('#01 => should handle partial object', () => {
      const result = transform(({ partial }) => ({
        user: partial({ name: 'string', age: 'number' }),
      }));
      expect(result).toEqual({
        user: { name: undefined, age: undefined },
      });
    });
  });

  describe('Helper: record', () => {
    it('#01 => should create record with string value', () => {
      const result = transform(({ record }) => ({
        dict: record('string'),
      }));
      expect(result).toEqual({ dict: {} });
    });

    it('#02 => should create record with specific keys', () => {
      const result = transform(({ record }) => ({
        config: record('boolean', 'enabled', 'visible', 'active'),
      }));
      expect(result).toEqual({
        config: {
          enabled: undefined,
          visible: undefined,
          active: undefined,
        },
      });
    });

    it('#03 => should create record with object value', () => {
      const result = transform(({ record }) => ({
        users: record({ name: 'string', age: 'number' }, 'user1', 'user2'),
      }));
      expect(result).toEqual({
        users: {
          user1: { name: undefined, age: undefined },
          user2: { name: undefined, age: undefined },
        },
      });
    });
  });

  describe('Helper: soa (SingleOrArray)', () => {
    it('#01 => should handle soa with string', () => {
      const result = transform(({ soa }) => ({
        value: soa('string'),
      }));
      expect(result).toEqual({ value: undefined });
    });

    it('#02 => should handle soa with object', () => {
      const result = transform(({ soa }) => ({
        item: soa({ name: 'string' }),
      }));
      expect(result).toEqual({ item: { name: undefined } });
    });
  });

  describe('Helper: sv (StateValue)', () => {
    it('#01 => should handle sv', () => {
      const result = transform(({ sv }) => ({
        state: sv,
      }));
      expect(result).toEqual({ state: {} });
    });
  });

  describe('Complex scenarios', () => {
    it('#01 => Complex nested structure with array, maybe, intersection', () => {
      const result = transform(({ array, maybe, intersection }) => ({
        nodes: maybe(
          array(
            intersection(
              {
                position: {
                  x: 'number',
                  y: 'number',
                },
                data: {
                  label: maybe('string'),
                  content: 'string',
                },
                input: 'boolean',
              },
              { id: 'string' },
            ),
          ),
        ),
      }));

      expect(result).toEqual({
        nodes: {
          [ARRAY]: {
            data: {
              content: undefined,
              label: undefined,
            },
            id: undefined,
            input: undefined,
            position: {
              x: undefined,
              y: undefined,
            },
          },
        },
      });
    });

    it('#02 => Complex form schema', () => {
      const result = transform(
        ({ array, maybe, union, litterals, custom }) => ({
          fields: array({
            name: 'string',
            type: litterals('text', 'number', 'select', 'checkbox'),
            required: 'boolean',
            options: maybe(array('string')),
            validation: maybe({
              min: maybe('number'),
              max: maybe('number'),
              pattern: maybe(custom<RegExp>()),
            }),
          }),
          submitUrl: 'string',
          method: union(
            'string',
            litterals('GET', 'POST', 'PUT', 'DELETE'),
          ),
        }),
      );

      expect(result).toEqual({
        fields: {
          [ARRAY]: {
            name: undefined,
            type: undefined,
            required: undefined,
            options: { [ARRAY]: undefined },
            validation: {
              max: undefined,
              min: undefined,
              pattern: {},
            },
          },
        },
        submitUrl: undefined,
        method: undefined,
      });
    });

    it('#03 => API response schema', () => {
      const result = transform(
        ({ array, maybe, union, intersection }) => ({
          data: union(
            {
              success: 'boolean',
              items: array(
                intersection(
                  { id: 'string', createdAt: 'date' },
                  {
                    name: 'string',
                    metadata: maybe({
                      tags: maybe(array('string')),
                      priority: 'number',
                    }),
                  },
                ),
              ),
            },
            {
              success: 'boolean',
              error: { code: 'number', message: 'string' },
            },
          ),
          pagination: maybe({
            page: 'number',
            total: 'number',
            hasMore: 'boolean',
          }),
        }),
      );

      expect(result).toEqual({
        data: {
          items: {
            '$$app-ts => array$$': {
              createdAt: undefined,
              id: undefined,
              metadata: {
                priority: undefined,
                tags: {
                  '$$app-ts => array$$': undefined,
                },
              },
              name: undefined,
            },
          },
          success: undefined,
        },
        pagination: {
          hasMore: undefined,
          page: undefined,
          total: undefined,
        },
      });
    });

    it('#04 => Nested tuples and arrays', () => {
      const result = transform(({ tuple, array, maybe }) => ({
        coordinates: tuple('number', 'number', 'number'),
        path: array(tuple('number', 'number')),
        bounds: maybe(tuple({ min: 'number' }, { max: 'number' })),
      }));

      expect(result).toEqual({
        bounds: [{ min: undefined }, { max: undefined }],
        coordinates: [undefined, undefined, undefined],
        path: {
          '$$app-ts => array$$': [undefined, undefined],
        },
      });
    });

    it('#05 => Record with complex values', () => {
      const result = transform(({ record, maybe, array }) => ({
        users: record(
          {
            profile: {
              firstName: 'string',
              lastName: 'string',
              avatar: maybe('string'),
            },
            posts: array({
              title: 'string',
              content: 'string',
              published: 'boolean',
            }),
          },
          'admin',
          'editor',
          'viewer',
        ),
      }));

      expect(result).toEqual({
        users: {
          admin: {
            profile: {},
            posts: { [ARRAY]: {} },
          },
          editor: {
            profile: {},
            posts: { [ARRAY]: {} },
          },
          viewer: {
            profile: {},
            posts: { [ARRAY]: {} },
          },
        },
      });
    });

    it('#06 => All helpers combined', () => {
      const result = transform(
        ({
          any,
          array,
          custom,
          intersection,
          litterals,
          maybe,
          partial,
          record,
          soa,
          sv,
          tuple,
          union,
        }) => ({
          anyValue: any('string'),
          items: array({ id: 'string' }),
          customData: custom<{ foo: string }>(),
          merged: intersection({ a: 'string' }, { b: 'number' }),
          status: litterals('on', 'off'),
          optional: maybe('boolean'),
          partialObj: partial({ x: 'number', y: 'number' }),
          mapping: record('string', 'key1', 'key2'),
          mapping2: record('number'),
          single: soa('number'),
          stateValue: sv,
          coords: tuple('number', 'number'),
          choice: union('string', 'number'),
        }),
      );

      expect(result).toEqual({
        anyValue: undefined,
        choice: undefined,
        coords: [undefined, undefined],
        customData: {},
        items: {
          '$$app-ts => array$$': {
            id: undefined,
          },
        },
        mapping: {
          key1: undefined,
          key2: undefined,
        },
        mapping2: {},
        merged: {
          a: undefined,
          b: undefined,
        },
        optional: undefined,
        partialObj: {
          x: undefined,
          y: undefined,
        },
        single: undefined,
        stateValue: {},
        status: undefined,
      });
    });
  });
});
