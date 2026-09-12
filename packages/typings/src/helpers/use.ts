import type { Sh } from '../types';

/**
 * Extracts the underlying `__type` schema definition from a Standard Schema object.
 *
 * @template | Type {@linkcode Sh} `T` - The Standard Schema object.
 *
 * @param schema - Object containing a `__type` property.
 *
 * @returns The extracted `__type` schema definition.
 */
export const use = <T extends Sh>({ __type }: T): T['__type'] => __type;
