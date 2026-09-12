import { type } from '@bemedev/typings';

describe('project1 tests', () => {
  test('runs typings type function', () => {
    expect(type('string')).toBeDefined();
  });
});
