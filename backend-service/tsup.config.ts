import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: './dist',
  format: ['esm'],
  target: 'esnext',
  clean: true,
  dts: true,
  sourcemap: true,
  splitting: false,
  shims: false,
  treeshake: true,
  skipNodeModulesBundle: true,
  esbuildOptions(options) {
    options.alias = {
      '@': './src',
    };
  },
});