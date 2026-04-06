import { type } from '../type';

describe('Transform: Helper partial', () => {
  it('#01 => should handle partial object', () => {
    const result = type(({ partial }) => ({
      user: partial({ name: 'string', age: 'number' }),
    }));
    expect(result).toEqual({
      user: { name: undefined, age: undefined },
    });
  });

  it('#02 => should handle partial with single property', () => {
    const result = type(({ partial }) => ({
      config: partial({ enabled: 'boolean' }),
    }));
    expect(result).toEqual({
      config: { enabled: undefined },
    });
  });

  it('#03 => should handle partial with multiple properties', () => {
    const result = type(({ partial }) => ({
      settings: partial({
        theme: 'string',
        fontSize: 'number',
        darkMode: 'boolean',
      }),
    }));
    expect(result).toEqual({
      settings: {
        theme: undefined,
        fontSize: undefined,
        darkMode: undefined,
      },
    });
  });
});
