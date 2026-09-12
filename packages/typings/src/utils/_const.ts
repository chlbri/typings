import type { ObjectT } from '../types';

/**
 * Returns the provided schema value as-is, typed as type {@linkcode ObjectT}.
 *
 * @template | Type {@linkcode ObjectT} `T` - The schema type.
 *
 * @param value - Optional value to return.
 *
 * @returns The value typed as `T`.
 */
export const _const = <T extends ObjectT>(value?: T) => value as T;
