import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/tests/setup-test-environment.js'],
    include: ['./src/**/*.{spec,test}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    watch: {
      ignored: [
        String.raw`.*\/node_modules\/.*`,
        String.raw`.*\/build\/.*`,
        String.raw`.*\/postgres-data\/.*`,
      ],
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
