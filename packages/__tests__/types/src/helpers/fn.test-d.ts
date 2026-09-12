import { type } from '@bemedev/typings';

describe('helpers: fn', () => {
  // No args -> () => void
  const noArgsSchema = type(({ fn }) => fn());
  expectTypeOf(noArgsSchema.type).toEqualTypeOf<() => void>();

  // Via fn helper directly — single argument, default void return
  const singleArgSchema = type(({ fn }) => fn(['string']));
  expectTypeOf(singleArgSchema.type).toEqualTypeOf<(arg: string) => void>();

  // Multiple arguments, explicit return type
  const multipleArgsSchema = type(({ fn }) => fn(['string', 'number'], 'boolean'));
  expectTypeOf(multipleArgsSchema.type).toEqualTypeOf<
    (arg0: string, arg1: number) => boolean
  >();

  // Object return type
  const objectReturnSchema = type(({ fn }) => fn(['string'], { id: 'number' }));
  expectTypeOf(objectReturnSchema.type).toEqualTypeOf<
    (arg: string) => { id: number }
  >();

  // Inside type() with builder helpers
  const builderSchema = type(({ fn, primitive }) => ({
    handler: fn([primitive.string(), primitive.number()], primitive.boolean()),
  }));
  expectTypeOf(builderSchema.type).toEqualTypeOf<{
    handler: (arg0: string, arg1: number) => boolean;
  }>();

  // Inside type() via "function" alias in helpers
  const functionAliasSchema = type(({ function: builderFunction, primitive }) => ({
    execute: builderFunction(['string'], primitive.number()),
  }));
  expectTypeOf(functionAliasSchema.type).toEqualTypeOf<{
    execute: (arg: string) => number;
  }>();

  // Root level schema with function helper
  const rootFn = type(({ fn }) => fn(['number'], 'string'));
  expectTypeOf(rootFn.type).toEqualTypeOf<(arg: number) => string>();

  // Via exported function alias
  const aliasedSchema = type(({ fn }) => fn(['boolean'], 'string'));
  expectTypeOf(aliasedSchema.type).toEqualTypeOf<(arg: boolean) => string>();
});
