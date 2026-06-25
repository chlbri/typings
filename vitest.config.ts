import { exclude } from '@bemedev/dev-utils/vitest-exclude';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    exclude({
      ignoreCoverageFiles: [
        '**/index.ts',
        '**/fixtures.ts',
        'src/types/undefiny.ts',
        '**/*.types.ts',
        '**/*.test-d.ts',
      ],
    }),
  ],
  test: {
    bail: 30,
    maxConcurrency: 10,
    passWithNoTests: true,
    slowTestThreshold: 3000,
    testTimeout: 50_000,
    hookTimeout: 50_000,
    globals: true,
    logHeapUsage: true,
    typecheck: {
      enabled: true,
      ignoreSourceErrors: false,
    },
    coverage: {
      enabled: true,
      reportsDirectory: '.coverage',
      provider: 'v8',
    },
  },
});
