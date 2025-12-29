import { SOA } from '../../constants';
import { transform } from '../../transform';

describe('Transform: Helper soa (SingleOrArray)', () => {
  it('#01 => should handle soa with string', () => {
    const result = transform(({ soa }) => ({
      value: soa('string'),
    }));
    expect(result).toEqual({ value: { [SOA]: undefined } });
  });

  it('#02 => should handle soa with object', () => {
    const result = transform(({ soa }) => ({
      item: soa({ name: 'string' }),
    }));
    expect(result).toEqual({ item: { [SOA]: { name: undefined } } });
  });

  it('#03 => should handle soa with number', () => {
    const result = transform(({ soa }) => ({
      count: soa('number'),
    }));
    expect(result).toEqual({ count: { [SOA]: undefined } });
  });

  it('#04 => should handle soa with boolean', () => {
    const result = transform(({ soa }) => ({
      flag: soa('boolean'),
    }));
    expect(result).toEqual({ flag: { [SOA]: undefined } });
  });

  it('#05 => should handle soa with complex object', () => {
    const result = transform(({ soa }) => ({
      user: soa({ id: 'string', name: 'string', age: 'number' }),
    }));
    expect(result).toEqual({
      user: { [SOA]: { id: undefined, name: undefined, age: undefined } },
    });
  });
});
