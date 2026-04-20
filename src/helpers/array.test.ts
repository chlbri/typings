import { type } from '../type';

describe('Helper: array', () => {
  describe('#01 => array of strings', () => {
    const result = type(({ array }) => ({
      tags: array('string'),
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({ tags: ['string'] }));

    test('#02 => ~standard.version is 1', () =>
      expect(result['~standard'].version).toBe(1));

    test('#03 => validate() captures the value', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: { tags: ['string'] },
      }));
  });

  describe('#02 => array of objects', () => {
    const result = type(({ array }) => ({
      users: array({ name: 'string', age: 'number' }),
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({
        users: [{ name: 'string', age: 'number' }],
      }));

    test('#02 => validate() captures the value', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: { users: [{ name: 'string', age: 'number' }] },
      }));
  });

  describe('#03 => nested arrays', () => {
    const result = type(({ array }) => ({
      matrix: array(array('number')),
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({ matrix: [['number']] }));
  });

  describe('#04 => array of numbers', () => {
    const result = type(({ array }) => ({
      scores: array('number'),
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({ scores: ['number'] }));
  });

  describe('#05 => array of booleans', () => {
    const result = type(({ array }) => ({
      flags: array('boolean'),
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({ flags: ['boolean'] }));
  });

  describe('#06 => array with nested object', () => {
    const result = type(({ array }) => ({
      items: array({
        id: 'string',
        data: { value: 'number', label: 'string' },
      }),
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({
        items: [
          { id: 'string', data: { value: 'number', label: 'string' } },
        ],
      }));
  });
});
