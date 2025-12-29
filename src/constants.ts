export const PRIMITIVES = [
  'string',
  'number',
  'boolean',
  'bigint',
  'symbol',
  'undefined',
  'null',
] as const;

export const PRIMITIVE_OBJECTS = ['date', 'primitive'] as const;
export const MAYBE = '$$app-ts => maybe$$' as const;
export const CUSTOM = '$$app-ts => custom$$' as const;
export const PARTIAL = '$$app-ts => partial$$' as const;
export const ARRAY = '$$app-ts => array$$' as const;
