import type { Fn, FnBasic, ObjectT } from "../types";

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
export const expandFn2 = <
  Main extends Fn,
  C extends ObjectT,
  const Tr extends object = object,
>(
  main: Main,
  type: C,
  extensions?: Tr,
): FnBasic<Main, Tr & { const: C; type: C }> => {
  return expandFn(main, {
    ...extensions,
    const: type,
    type: type,
  }) as any;
};
