import { transform } from '../../transform';

describe('Transform: Helper intersection', () => {
  it('#01 => should merge two objects', () => {
    const result = transform(({ intersection }) => ({
      person: intersection({ name: 'string' }, { age: 'number' }),
    }));
    expect(result).toEqual({
      person: { name: undefined, age: undefined },
    });
  });

  it('#02 => should merge multiple objects', () => {
    const result = transform(({ intersection }) => ({
      entity: intersection(
        { id: 'string' },
        { name: 'string' },
        { createdAt: 'date' },
      ),
    }));
    expect(result).toEqual({
      entity: { id: undefined, name: undefined, createdAt: undefined },
    });
  });

  it('#03 => should merge objects with nested properties', () => {
    const result = transform(({ intersection }) => ({
      data: intersection(
        { user: { name: 'string' } },
        { meta: { timestamp: 'number' } },
      ),
    }));
    expect(result).toEqual({
      data: {
        user: { name: undefined },
        meta: { timestamp: undefined },
      },
    });
  });

  it('#04 => should merge four objects', () => {
    const result = transform(({ intersection }) => ({
      full: intersection(
        { a: 'string' },
        { b: 'number' },
        { c: 'boolean' },
        { d: 'date' },
      ),
    }));
    expect(result).toEqual({
      full: { a: undefined, b: undefined, c: undefined, d: undefined },
    });
  });
});
