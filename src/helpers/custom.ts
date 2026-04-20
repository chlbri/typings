import { standardize2 } from "../standard";
// oxlint-disable-next-line no-unused-vars
import type { Custom, ObjectT } from "../types";
// oxlint-disable-next-line no-unused-vars
import type { type } from "../type";
import { _const, expandFn2 } from "../utils";

const _type = _const("any");

/**
 *  Create a custom value that can be used in the state value or as a literal.
 * @param value The value to create the custom value from.
 * @returns A custom value that can be used in the state value or as a literal.
 *
 * @important the type parameter `T` must not inherit of type {@link ObjectT}, otherwise it will be considered as an object and do not transform it in {@link type}
 *
 * @example
 * ```ts
 * const myCustomValue = custom({ foo: 'bar' });
 * // myCustomValue is of type Custom<{ foo: 'bar }>
 * ```
 *
 * @see {@link Custom} for more information about custom values.
 */
export const custom = expandFn2(<const T = any>(value?: T) => {
  type TT = ObjectT extends T ? "any" : Custom<T>;
  return standardize2<TT>(value);
}, "any");
