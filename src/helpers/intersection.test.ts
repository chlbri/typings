import { type } from '../type';

describe('Helper: intersection', () => {
  describe('#01 => merge two objects', () => {
    const result = type(({ intersection }) => ({
      person: intersection({ name: 'string' }, { age: 'number' }),
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({
        person: [{ name: 'string' }, { age: 'number' }],
      }));

    test('#02 => ~standard.version is 1', () =>
      expect(result['~standard'].version).toBe(1));

    test('#03 => validate() captures the value', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: { person: [{ name: 'string' }, { age: 'number' }] },
      }));
  });

  describe('#02 => merge three objects', () => {
    const result = type(({ intersection }) => ({
      entity: intersection(
        { id: 'string' },
        { name: 'string' },
        { createdAt: 'date' },
      ),
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({
        entity: [
          { id: 'string' },
          { name: 'string' },
          { createdAt: 'date' },
        ],
      }));
  });

  describe('#03 => merge objects with nested properties', () => {
    const result = type(({ intersection }) => ({
      data: intersection(
        { user: { name: 'string' } },
        { meta: { timestamp: 'number' } },
      ),
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({
        data: [
          { user: { name: 'string' } },
          { meta: { timestamp: 'number' } },
        ],
      }));
  });

  describe('#04 => merge four objects', () => {
    const result = type(({ intersection }) => ({
      full: intersection(
        { a: 'string' },
        { b: 'number' },
        { c: 'boolean' },
        { d: 'date' },
      ),
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({
        full: [
          { a: 'string' },
          { b: 'number' },
          { c: 'boolean' },
          { d: 'date' },
        ],
      }));
  });
});
