type Fn<Args extends any[] = any[], R = any> = (...args: Args) => R;

type FnBasic<Main extends Fn, Tr extends object> = Tr & Main;

export const expandFn = <
  Main extends Fn,
  const Tr extends object = object,
>(
  main: Main,
  extensions?: Tr,
): FnBasic<Main, Tr> => {
  const out: any = main;

  if (extensions) {
    Object.assign(out, extensions);
  }

  return out;
};
