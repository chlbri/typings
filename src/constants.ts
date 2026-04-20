export const PRIMITIVES = [
  'string',
  'number',
  'boolean',
  'bigint',
  'symbol',
  'undefined',
  'null',
  'never',
  'primitive',
] as const;

export const PRIMITIVE_OBJECTS = [
  'date',
  'any',
  'object',
  'unknown',
] as const;
export const OPTIONAL = '$$app-ts => optional$$';
export const UNION = '$$app-ts => union$$';
export const CUSTOM = '$$app-ts => custom$$';
export const PARTIAL = '$$app-ts => partial$$';
export const ARRAY = '$$app-ts => array$$';
export const SOA = '$$app-ts => soa$$';
export const LITTERALS = '$$app-ts => litterals$$';
