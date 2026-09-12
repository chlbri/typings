import type { ObjectT } from '../types';

/**
 * Marks a schema definition as read-only.
 *
 * @template | Type {@linkcode ObjectT} `T` - Schema definition type.
 *
 * @param value - The schema to mark as read-only.
 *
 * @returns The unchanged schema value.
 */
export const readonly = <const T extends ObjectT>(value: T) => value;
