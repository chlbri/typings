import { transform } from '../../transform';

describe('Transform: Helper record', () => {
  it('#01 => should create record with string value', () => {
    const result = transform(({ record }) => ({
      dict: record('string'),
    }));
    expect(result).toEqual({ dict: {} });
  });

  it('#02 => should create record with specific keys', () => {
    const result = transform(({ record }) => ({
      config: record('boolean', 'enabled', 'visible', 'active'),
    }));
    expect(result).toEqual({
      config: {
        enabled: undefined,
        visible: undefined,
        active: undefined,
      },
    });
  });

  it('#03 => should create record with object value', () => {
    const result = transform(({ record }) => ({
      users: record({ name: 'string', age: 'number' }, 'user1', 'user2'),
    }));
    expect(result).toEqual({
      users: {
        user1: { name: undefined, age: undefined },
        user2: { name: undefined, age: undefined },
      },
    });
  });

  it('#04 => should create record with number value', () => {
    const result = transform(({ record }) => ({
      scores: record('number'),
    }));
    expect(result).toEqual({ scores: {} });
  });

  it('#05 => should create record with single key', () => {
    const result = transform(({ record }) => ({
      single: record('string', 'onlyKey'),
    }));
    expect(result).toEqual({ single: { onlyKey: undefined } });
  });
});
