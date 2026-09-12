import type { StandardSchemaV1 } from '@standard-schema/spec';

import type { STANDARD_KEY } from '../constants';
import type { Optional } from './customs.types';
import type { TransformT } from './transform.types';
import type { ObjectT, POS } from './typings.types';
import type { Simplify } from './utilities.types';

export type * from '@standard-schema/spec';

/** Property keys defined by the Standard Schema specification. */
export type StandardKey = keyof StandardSchemaV1;

/**
 * Type representing an object conforming to the interface
 * {@linkcode StandardSchemaV1} with `__type` and `type` fields.
 *
 * @template T1 - The schema definition type.
 * @template T2 - The inferred output type.
 */
export type StandardHelper<T1 = any, T2 = any> = {
  __type: T1;
  type: T2;
} & StandardSchemaV1<T2, T2>;

type _inferO<T extends ObjectT = ObjectT> = ObjectT extends T
  ? unknown
  : T extends Optional<infer U>
    ? TransformT<U> | undefined
    : TransformT<T>;

/**
 * Infers the output type from a schema definition.
 *
 * @template | Type {@linkcode POS} `T` - Input schema definition.
 */
export type inferO<T extends POS> = Simplify<_inferO<T>>;

type _Sh<T1 = any, T2 = any> = StandardHelper<T1, T2>;

/**
 * Standard schema helper type for schema definition `T`.
 *
 * @template | Type {@linkcode ObjectT} `T` - Input schema definition.
 *
 * @see -- type {@linkcode StandardHelper}
 */
export type Sh<T extends ObjectT = ObjectT> = StandardHelper<T, inferO<T>>;

/**
 * Shape representing standard output containing the standard schema vendor key.
 *
 * @template T - The inferred output type.
 */
export type StandardOutput<T = any> = { [STANDARD_KEY]: { types?: { output: T } } };

/**
 * Infers the full standard schema structure for schema definition `T`.
 *
 * @template | Type {@linkcode ObjectT} `T` - Input schema definition.
 *
 * @see -- type {@linkcode inferO}
 */
export type inferSh<T extends ObjectT = ObjectT> = _Sh<T, inferO<T>>;

type _inferT<T extends StandardOutput = StandardOutput> = Exclude<
  T[typeof STANDARD_KEY]['types'],
  undefined
>['output'];

/**
 * Extracts the output type from a Standard Schema object.
 *
 * @template | Type {@linkcode StandardOutput} `T` - A standard schema instance.
 */
export type inferT<T extends StandardOutput = StandardOutput> = _inferT<T>;
