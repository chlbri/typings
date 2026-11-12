import { defineProject } from "vite-plus";

export default defineProject({
  resolve: { tsconfigPaths: true },

  test: {
    name: "types",
    bail: 100,
    maxConcurrency: 100,
    include: [],
    typecheck: { enabled: true, include: ["**/*.test-d.ts"] },
    env: { NODE_ENV: "test" },
    globals: true,
  },
});
