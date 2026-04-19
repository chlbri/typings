export const PRIMITIVES = [
  "string",
  "number",
  "boolean",
  "bigint",
  "symbol",
  "undefined",
  "null",
  "unknown",
  "never",
  "primitive",
] as const;

export const PRIMITIVE_OBJECTS = ["date", "any", "object"] as const;
export const OPTIONAL = "$$app-ts => optional$$" as const;
export const CUSTOM = "$$app-ts => custom$$" as const;
export const PARTIAL = "$$app-ts => partial$$" as const;
export const ARRAY = "$$app-ts => array$$" as const;
export const SOA = "$$app-ts => soa$$" as const;
