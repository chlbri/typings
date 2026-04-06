import { type } from '../type';

describe('Transform: Helper custom', () => {
  it('#01 => should handle custom type', () => {
    const result = type(({ custom }) => ({
      value: custom<number>(),
    }));
    expect(result).toEqual({ value: {} });
  });

  it('#02 => should handle custom type with value', () => {
    const result = type(({ custom }) => ({
      value: custom('test'),
    }));
    expect(result).toEqual({ value: {} });
  });

  it('#03 => should return empty object for custom only', () => {
    const result = type(({ custom }) => custom<string>());
    expect(result).toEqual({});
  });

  it('#04 => should handle custom with complex type', () => {
    const result = type(({ custom }) => ({
      regex: custom<RegExp>(),
    }));
    expect(result).toEqual({ regex: {} });
  });

  it('#05 => should handle custom with array type', () => {
    const result = type(({ custom }) => ({
      items: custom<string[]>(),
    }));
    expect(result).toEqual({ items: {} });
  });
});
