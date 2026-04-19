import { defineConfig } from "@bemedev/dev-utils/rolldown";

export default defineConfig({
  ignoresJS: [
    "**/fixtures.ts",
    "**/*.types.ts",
    "**/*.test-d.ts",
    "**/*.test.ts",
  ],
});
