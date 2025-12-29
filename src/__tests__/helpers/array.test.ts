import { ARRAY } from '../../constants';
import { transform } from '../../transform';

describe('Transform: Helper array', () => {
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

  it('#04 => should transform array of numbers', () => {
    const result = transform(({ array }) => ({
      scores: array('number'),
    }));
    expect(result).toEqual({ scores: { [ARRAY]: undefined } });
  });

  it('#05 => should transform array of booleans', () => {
    const result = transform(({ array }) => ({
      flags: array('boolean'),
    }));
    expect(result).toEqual({ flags: { [ARRAY]: undefined } });
  });
});
