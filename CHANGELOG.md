## CHANGELOG

<br/>

<details>
<summary>

## **[0.5.4] - 24/04/2026** => _01:21_

</summary>

- Improve built package test imports and implementation typing in
  `src/index.built.test.ts`
- Normalize quote style across standard and type test files
- Adjust `StandardSchemaV1` typings and `~standard` assertions in
  `src/standard.types.ts`

</details>

<br/>

<details>
<summary>

## **[0.5.3] - 24/04/2026** => _00:20_

</summary>

- Enhance `union` support for `primitiveObject` schema combinations and
  `UnionCustom` typing
- Centralize `type()` transform helper typings in `src/type.ts` with the
  new `Helpers` / `Transform_F` model
- Remove legacy `src/type.types.ts` and simplify transform type exports
- Add `primitiveObject` + `union` coverage in type tests
- Upgrade dev tooling dependencies for TypeScript, Vitest, oxfmt, oxlint,
  and rolldown

</details>

<br/>

<details>
<summary>

## **[0.5.2] - 20/04/2026** => _13:46_

</summary>

- Improve `inferT` type definition for better StandardSchema compatibility
- Normalize additional quote style inconsistencies across type definitions
- Enhance type inference consistency in core types
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.5.1] - 20/04/2026** => _15:52_

</summary>

- Normalize quote style across type definitions (double → single quotes)
- Improve code consistency in `src/types.ts`
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.5.0] - 20/04/2026** => _15:45_

</summary>

- Refactor type inference system to use `inferSh` utility for improved type
  handling and consistency (`src/types.ts`)
- Enhance type safety and readability across all helpers with better type
  annotations
- Improve type transformation support in helper functions
- Update rolldown configuration to handle additional file patterns
  correctly
- Add comprehensive type tests for complex type transformation scenarios
- Fix naming inconsistencies in core types (`Primiive` → `Primitive`,
  `PrimitiveS` → `PrimitiveT`)
- Enhance TypeScript type validation and test coverage
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.4.0] - 20/04/2026** => _11:17_

</summary>

- Add `object` helper for object schema definitions
  (`src/helpers/object.ts`)
- Add Standard Schema support with `StandardSchemaV1` interface
  (`src/standard.types.ts`)
- Add `standardize` and `standardize2` functions for Standard Schema
  compatibility (`src/standard.ts`)
- Add comprehensive test coverage for `object` helper with type utilities
- Add type test files for `type()` function and standard schema validation
- Refactor helpers for improved type safety and readability (all helpers in
  `src/helpers/`)
- Refactor internal type system infrastructure for better standardization
  support
- Update rolldown configuration to ignore additional file patterns
- Add utilities module with helper functions (`src/utils/index.ts`)
- Enhance readonly helper with comprehensive test coverage
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.2.2] - 19/04/2026** => _17:28_

</summary>

- Enhance `primitiveObject` and `primitiveObject.map` — now accept
  `IntersectionCustom<PrimitiveObjectMapS[]>` as input, enabling
  `primitiveObject(intersection(...))` usage
- Add `IntersectionCustom` type export to `src/types.ts` (centralised)
- Refactor `src/helpers/intersection.ts` — remove local
  `IntersectionCustom` definition, import from `src/types.ts`
- Add test coverage for `primitiveObject(intersection(...))` pattern in
  `primitives.test-d.ts`
- Fix quote style in `src/types.ts` — normalise to single quotes
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.2.1] - 19/04/2026** => _16:34_

</summary>

- Refactor all helpers from default exports to named exports
  (`export { name }`)
- Refactor `src/helpers/index.ts` — replace `export { default as name }`
  with `export * from "./name"`
- Refactor `src/index.ts` — namespace helpers under
  `export * as helpers from './helpers'`
- Refactor `union.ts` internal naming (`fn` → `union`, `union` → `_union`)
  for clarity
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.2.0] - 19/04/2026** => _09:45_

</summary>

- Add `primitiveObject` helper for type schema definitions
  (`src/helpers/primitiveObject.ts`)
- Add `type()` function support for `primitiveObject` parameter
- Add `inferT` type utility to handle transformation cases
- Add comprehensive test coverage for `primitiveObject` with `type()`
  function
- Add complex test scenarios combining `primitiveObject` with `optional`,
  `array`, and `intersection` helpers
- Enhance optional tests with type transformation scenarios
- Refactor helpers index exports
- Update type system infrastructure for better helper support
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.1.0] - 06/04/2026** => _10:00_

</summary>

- Remove `transform` — replaced by `type` (breaking change)
- Remove `maybe` helper — replaced by `optional` (breaking change)
- Add `type` function as the new main API (`src/type.ts`,
  `src/type.types.ts`)
- Add `optional` helper as a standalone module (`src/helpers/optional.ts`)
- Refactor tests — co-located with source files (moved from
  `src/__tests__/helpers/` to `src/helpers/`)
- Replace rollup with rolldown for bundling
- Replace eslint + prettier with oxlint + oxfmt for linting and formatting
- Update CI scripts with timing instrumentation
- Rename `CHANGE_LOG.md` → `CHANGELOG.md`
- Update dev dependencies
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.0.2] - 29/12/2025** => _11:45_

</summary>

- Add `expectTypeOf` examples in `README.md`
- Refactor complex test scenarios
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.0.1] - 29/12/2025** => _11:12_

</summary>

- Add `transform` core logic
- Add type helpers (`any`, `array`, `custom`, `intersection`, `litterals`,
  `optional`, `partial`, `record`, `soa`, `sv`, `tuple`, `union`)
- Add `expandFn` utility
- Add comprehensive tests for `transform`
- Update project configuration
- <u>Test coverage **_100%_**</u>

</details>

<br/>
<br/>

## Auteur

chlbri (bri_lvi@icloud.com)

[My github](https://github.com/chlbri?tab=repositories)

[<svg width="98" height="96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/></svg>](https://github.com/chlbri?tab=repositories)

<br/>

## Liens

- [Documentation](https://github.com/chlbri/new-package)
