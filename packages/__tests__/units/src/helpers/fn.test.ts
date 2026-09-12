import { type } from '@bemedev/typings';
import { STANDARD_KEY } from '@bemedev/typings/constants';

describe('Helper: fn', () => {
  describe('#01 => fn with no arguments', () => {
    const result = type(({ fn }) => ({ run: fn() }));

    test('#01 => value matches default', () => {
      expect(result.type.run).toEqual({ args: [], return: undefined });
    });

    test(`#02 => ${STANDARD_KEY}.version is 1`, () => {
      expect(result[STANDARD_KEY].version).toBe(1);
    });
  });

  describe('#02 => fn with args and return type', () => {
    const result = type(({ fn, primitive }) => ({
      add: fn([primitive('number'), primitive('number')], primitive('number')),
    }));

    test('#01 => value captures args and return', () => {
      expect(result.type.add).toEqual({
        args: ['number', 'number'],
        return: 'number',
      });
    });

    test(`#02 => ${STANDARD_KEY}.version is 1`, () => {
      expect(result[STANDARD_KEY].version).toBe(1);
    });
  });

  describe('#03 => fn as root', () => {
    const result = type(({ fn }) => fn(['string'], 'boolean'));

    test('#01 => value matches', () => {
      expect(result.type).toEqual({ args: ['string'], return: 'boolean' });
    });

    test(`#02 => ${STANDARD_KEY}.version is 1`, () => {
      expect(result[STANDARD_KEY].version).toBe(1);
    });
  });

  describe('#04 => fn with function alias in helpers', () => {
    const result = type(({ function: fnAlias }) => ({
      exec: fnAlias(['boolean'], 'string'),
    }));

    test('#01 => value matches', () => {
      expect(result.type.exec).toEqual({ args: ['boolean'], return: 'string' });
    });

    test(`#02 => ${STANDARD_KEY}.version is 1`, () => {
      expect(result[STANDARD_KEY].version).toBe(1);
    });
  });
});
