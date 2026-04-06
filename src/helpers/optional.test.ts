import { ARRAY } from '../constants';
import { type } from '../type';

describe('Transform: Helper optional', () => {
  it('#01 => should transform optional string', () => {
    const result = type(({ optional }) => ({
      nickname: optional('string'),
    }));
    expect(result).toEqual({ nickname: undefined });
  });

  it('#02 => should transform optional object', () => {
    const result = type(({ optional }) => ({
      address: optional({ city: 'string', zip: 'number' }),
    }));
    expect(result).toEqual({
      address: { city: undefined, zip: undefined },
    });
  });

  it('#03 => should transform optional array', () => {
    const result = type(({ optional, array }) => ({
      items: optional(array('string')),
    }));
    expect(result).toEqual({ items: { [ARRAY]: undefined } });
  });

  it('#04 => should transform optional number', () => {
    const result = type(({ optional }) => ({
      count: optional('number'),
    }));
    expect(result).toEqual({ count: undefined });
  });

  it('#05 => should transform optional boolean', () => {
    const result = type(({ optional }) => ({
      active: optional('boolean'),
    }));
    expect(result).toEqual({ active: undefined });
  });

  it('#06 => should transform nested optional', () => {
    const result = type(({ optional }) => ({
      data: optional({
        inner: optional('string'),
      }),
    }));
    expect(result).toEqual({ data: { inner: undefined } });
  });
});
