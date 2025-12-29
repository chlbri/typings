import { transform } from '../../transform';

describe('Transform: Helper union', () => {
  it('#01 => should handle union of primitives', () => {
    const result = transform(({ union }) => ({
      value: union('string', 'number'),
    }));
    expect(result).toEqual({ value: undefined });
  });

  it('#02 => should handle union of objects', () => {
    const result = transform(({ union }) => ({
      item: union({ type: 'string' }, { value: 'number' }),
    }));
    expect(result).toEqual({ item: { type: undefined } });
  });

  it('#03 => should handle discriminated union', () => {
    const result = transform(({ union }) => ({
      event: union.discriminated(
        'type',
        { type: 'string', name: 'string' },
        { type: 'string', count: 'number' },
      ),
    }));
    expect(result).toEqual({
      event: { type: undefined, name: undefined },
    });
  });

  it('#04 => should handle union of three primitives', () => {
    const result = transform(({ union }) => ({
      value: union('string', 'number', 'boolean'),
    }));
    expect(result).toEqual({ value: undefined });
  });

  it('#05 => should handle union with null', () => {
    const result = transform(({ union }) => ({
      nullable: union('string', 'null'),
    }));
    expect(result).toEqual({ nullable: undefined });
  });
});
