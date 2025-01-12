import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Optional: Enable globals like `describe` and `it`.
    environment: 'node', // Set the environment (e.g., 'node' or 'jsdom').
    include: ['__tests__/**/*.spec.ts'], // Include test files in __tests__ folders.
    coverage: {
      provider: 'v8' // Optional: Use the v8 provider for coverage.
    }
  }
});
