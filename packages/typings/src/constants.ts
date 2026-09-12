/** Array of JSON-compatible primitive type identifier strings. */
export const JSON_PRIMITIVES = [
  'string',
  'number',
  'boolean',
  'undefined',
  'json',
] as const;

/**
 * Array of all supported primitive type identifier strings, including JSON
 * primitives and extended types.
 */
export const PRIMITIVES = [
  ...JSON_PRIMITIVES,
  'bigint',
  'symbol',
  'null',
  'never',
  'primitive',
] as const;

/** Array of special primitive object type identifier strings. */
export const PRIMITIVE_OBJECTS = ['date', 'any', 'object', 'unknown'] as const;

/** Internal symbol key marker for optional types. */
export const OPTIONAL = '$$app-ts => optional$$';

/** Internal symbol key marker for union types. */
export const UNION = '$$app-ts => union$$';

/** Internal symbol key marker for custom types. */
export const CUSTOM = '$$app-ts => custom$$';

/** Internal symbol key marker for partial types. */
export const PARTIAL = '$$app-ts => partial$$';

/** Internal symbol key marker for array types. */
export const ARRAY = '$$app-ts => array$$';

/** Internal symbol key marker for Single-or-Array (`SoA`) types. */
export const SOA = '$$app-ts => soa$$';

/** Internal symbol key marker for Single-or-Recursive-Array (`SoRa`) types. */
export const SORA = '$$app-ts => sora$$';

/** Internal symbol key marker for literal types. */
export const LITTERALS = '$$app-ts => litterals$$';

/** Key name used for the Standard Schema specification conformance. */
export const STANDARD_KEY = '~standard';

/** Vendor namespace identifier for Standard Schema implementations. */
export const vendor = '@bemedev/typings';
