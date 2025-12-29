import { transform } from '../../transform';

describe('Transform: Helper partial', () => {
  it('#01 => should handle partial object', () => {
    const result = transform(({ partial }) => ({
      user: partial({ name: 'string', age: 'number' }),
    }));
    expect(result).toEqual({
      user: { name: undefined, age: undefined },
    });
  });

  it('#02 => should handle partial with single property', () => {
    const result = transform(({ partial }) => ({
      config: partial({ enabled: 'boolean' }),
    }));
    expect(result).toEqual({
      config: { enabled: undefined },
    });
  });

  it('#03 => should handle partial with multiple properties', () => {
    const result = transform(({ partial }) => ({
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
