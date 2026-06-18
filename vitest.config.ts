import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const isCI = !!process.env.CI;

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.ts'],
    silent: 'passed-only',
    globals: true,
    mockReset: true,
    restoreMocks: true,
    reporters: isCI ? ['github-actions', 'junit'] : ['default'],
    outputFile: './junit.xml',
    coverage: {
      provider: 'v8',
      include: ['src/helpers/**/*.ts'],
      reporter: isCI ? ['text', 'json-summary', 'json'] : ['text', 'html'],
    },
  },
  resolve: {
    alias: {
      '@config': fileURLToPath(new URL('./src/site.config.ts', import.meta.url)),
      '@helpers': fileURLToPath(new URL('./src/helpers', import.meta.url)),
      '@locales': fileURLToPath(new URL('./src/locales', import.meta.url)),
      '@scripts': fileURLToPath(new URL('./src/scripts', import.meta.url)),
    },
  },
});
