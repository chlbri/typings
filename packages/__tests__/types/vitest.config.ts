import { defineProject } from '@bemedev/dev-utils/vitest-extended';

export default defineProject({
  test: {
    name: 'types',
    include: [],
    typecheck: { enabled: true, include: ['**/*.test-d.ts'] },
  },
});
