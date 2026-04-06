import { type } from '../type';

describe('Transform: Helper sv (StateValue)', () => {
  it('#01 => should handle sv', () => {
    const result = type(({ sv }) => ({
      state: sv,
    }));
    expect(result).toEqual({ state: {} });
  });

  it('#02 => should handle sv in nested object', () => {
    const result = type(({ sv }) => ({
      machine: {
        currentState: sv,
      },
    }));
    expect(result).toEqual({ machine: { currentState: {} } });
  });

  it('#03 => should handle multiple sv', () => {
    const result = type(({ sv }) => ({
      state1: sv,
      state2: sv,
    }));
    expect(result).toEqual({ state1: {}, state2: {} });
  });
});
