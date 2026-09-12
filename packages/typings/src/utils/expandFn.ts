import type { Fn, FnBasic, ObjectT } from '../types';

/**
 * Attaches properties to a callable function while preserving its call signature.
 *
 * @template | Type {@linkcode Fn} `Main` - The base function type.
 * @template | Interface {@linkcode Object} `Tr` - The object properties to merge.
 *
 * @param main - The function to extend.
 * @param extensions - Optional properties to assign onto the function.
 *
 * @returns The extended function combining `Main` and `Tr`.
 *
 * @see -- type {@linkcode FnBasic}
 */
export const expandFn = <Main extends Fn, const Tr extends object = object>(
  main: Main,
  extensions?: Tr,
): FnBasic<Main, Tr> => {
  const out: any = main;

  /* v8 ignore start -- @preserve */
  if (extensions) Object.assign(out, extensions);
  /* v8 ignore stop -- @preserve */

  return out;
};

/**
 * Attaches a constant schema representation and optional properties to a function.
 *
 * @template | Type {@linkcode Fn} `Main` - The base function type.
 * @template | Type {@linkcode ObjectT} `C` - The schema representation type.
 * @template | Interface {@linkcode Object} `Tr` - Additional extension properties.
 *
 * @param main - The function to extend.
 * @param type - The schema representation value to assign to `const` and `type`
 *   properties.
 * @param extensions - Additional extension properties.
 *
 * @returns The extended function with `const` and `type` properties attached.
 *
 * @see -- type {@linkcode FnBasic}
 */
export const expandFn2 = <
  Main extends Fn,
  C extends ObjectT,
  const Tr extends object = object,
>(
  main: Main,
  type: C,
  extensions?: Tr,
): FnBasic<Main, Tr & { const: C; type: C }> => {
  return expandFn(main, { ...extensions, const: type, type: type }) as any;
};
