import { tuple as _tuple } from '.';
import { type } from '../type';

describe('Transform: Helper tuple', () => {
  it('#01 => should correctly create tuple', () => {
    expect(_tuple('string', 'boolean')).toEqual(['string', 'boolean']);
  });

  it('#02 => should transform tuple of primitives', () => {
    const result = type(({ tuple }) => ({
      coordinates: tuple('number', 'number'),
    }));
    expect(result).toEqual({ coordinates: [undefined, undefined] });
  });

  it('#03 => should transform tuple with mixed types', () => {
    const result = type(({ tuple }) => ({
      pair: tuple('string', 'number', 'boolean'),
    }));
    expect(result).toEqual({ pair: [undefined, undefined, undefined] });
  });

  it('#04 => should transform tuple with objects', () => {
    const result = type(({ tuple }) => ({
      data: tuple({ name: 'string' }, { age: 'number' }),
    }));
    expect(result).toEqual({
      data: [{ name: undefined }, { age: undefined }],
    });
  });

  it('#05 => should transform tuple with three numbers', () => {
    const result = type(({ tuple }) => ({
      rgb: tuple('number', 'number', 'number'),
    }));
    expect(result).toEqual({ rgb: [undefined, undefined, undefined] });
  });

  it('#06 => should transform tuple with string and number', () => {
    const result = type(({ tuple }) => ({
      entry: tuple('string', 'number'),
    }));
    expect(result).toEqual({ entry: [undefined, undefined] });
  });
});
