import { standardize2 } from '../standard';
import type {
  AnyArray,
  Custom,
  FunctionCustom,
  NotReadonly,
  ObjectT,
} from '../types';
import { _const, expandFn2 } from '../utils';

/**
 * Creates a function schema definition with argument and return type schemas.
 *
 * @example
 *   ```ts
 *   const myFn = fn([primitive.string()], primitive.number());
 *   ```;
 *
 * @template | Type {@linkcode AnyArray} `Args` - Function parameter schema
 *   definitions.
 * @template | Type {@linkcode ObjectT} `Return` - Function return schema definition.
 *
 * @param args - Array of schema definitions for the function arguments.
 * @param returnType - Schema definition for the function return type.
 *
 * @returns A function schema wrapped as type {@linkcode FunctionCustom}.
 */
export const fn = expandFn2(
  <
    const Args extends AnyArray<ObjectT> = [],
    const Return extends ObjectT = Custom<void>,
  >(
    args?: Args,
    returnType?: Return,
  ) => {
    return standardize2<FunctionCustom<NotReadonly<Args>, NotReadonly<Return>>>({
      args: (args ?? []) as any,
      return: returnType,
    });
  },
  _const<FunctionCustom>(),
);
