import { exclude } from '@bemedev/dev-utils/vitest-exclude';
import { defineProject } from '@bemedev/dev-utils/vitest-extended';

export default defineProject({
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
  test: { name: 'typings' },
});
