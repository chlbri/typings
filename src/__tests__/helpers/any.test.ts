import { transform } from '../../transform';

describe('Transform: Helper any', () => {
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

  it('#03 => should handle any helper with number', () => {
    const result = transform(({ any }) => ({
      count: any('number'),
    }));
    expect(result).toEqual({ count: undefined });
  });

  it('#04 => should handle any helper without argument', () => {
    const result = transform(({ any }) => ({
      unknown: any(),
    }));
    expect(result).toEqual({ unknown: undefined });
  });
});
