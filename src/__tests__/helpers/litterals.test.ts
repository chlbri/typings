import { transform } from '../../transform';

describe('Transform: Helper litterals', () => {
  it('#01 => should handle string literals', () => {
    const result = transform(({ litterals }) => ({
      status: litterals('active', 'inactive', 'pending'),
    }));
    expect(result).toEqual({ status: undefined });
  });

  it('#02 => should handle number literals', () => {
    const result = transform(({ litterals }) => ({
      priority: litterals(1, 2, 3),
    }));
    expect(result).toEqual({ priority: undefined });
  });

  it('#03 => should handle boolean literals', () => {
    const result = transform(({ litterals }) => ({
      flag: litterals(true, false),
    }));
    expect(result).toEqual({ flag: undefined });
  });

  it('#04 => should handle mixed literals', () => {
    const result = transform(({ litterals }) => ({
      value: litterals('yes', 'no', 1, 0, true),
    }));
    expect(result).toEqual({ value: undefined });
  });

  it('#05 => should handle two string literals', () => {
    const result = transform(({ litterals }) => ({
      direction: litterals('left', 'right'),
    }));
    expect(result).toEqual({ direction: undefined });
  });
});
