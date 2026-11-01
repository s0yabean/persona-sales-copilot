import { defineConfig } from 'vitest/config';

// Separate from vite.config.ts so tests don't load the dev-server chat plugin.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
  },
});
