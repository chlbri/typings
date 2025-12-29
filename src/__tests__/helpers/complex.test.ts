import { ARRAY, SOA } from '../../constants';
import { transform } from '../../transform';

describe('Transform: Complex scenarios', () => {
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
        method: union('string', litterals('GET', 'POST', 'PUT', 'DELETE')),
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
    const result = transform(({ array, maybe, union, intersection }) => ({
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
    }));

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
      single: { [SOA]: undefined },
      stateValue: {},
      status: undefined,
    });
  });
});
