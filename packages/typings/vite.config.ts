import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    entry: [
      'src/**/*.ts',
      '!src/fixtures.ts',
      '!src/**/__tests__/**',
      '!src/**/*.test.ts',
      '!src/**/*.test-d.ts',
      '!src/**/*.fixtures.ts',
      '!src/**/fixtures.ts',
      '!src/fixtures/**/*.ts',
    ],
    format: ['esm', 'cjs'],
    outDir: 'lib',
    root: 'src',
    unbundle: true,
    sourcemap: true,
    dts: true,
    clean: true,
    fixedExtension: false,
    nodeProtocol: 'strip',
    platform: 'node',
  },

  run: {
    tasks: {
      pack: {
        command: 'vp pack',

        cache: {
          input: ['src/**', 'package.json', 'tsconfig.json', '!**/*.gen.ts'],
          output: ['lib/**'],
        },
      },
    },
  },
});
