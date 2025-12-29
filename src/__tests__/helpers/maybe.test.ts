import { ARRAY } from '../../constants';
import { transform } from '../../transform';

describe('Transform: Helper maybe', () => {
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

  it('#04 => should transform maybe number', () => {
    const result = transform(({ maybe }) => ({
      count: maybe('number'),
    }));
    expect(result).toEqual({ count: undefined });
  });

  it('#05 => should transform maybe boolean', () => {
    const result = transform(({ maybe }) => ({
      active: maybe('boolean'),
    }));
    expect(result).toEqual({ active: undefined });
  });

  it('#06 => should transform nested maybe', () => {
    const result = transform(({ maybe }) => ({
      data: maybe({
        inner: maybe('string'),
      }),
    }));
    expect(result).toEqual({ data: { inner: undefined } });
  });
});
