import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'core',
      // the proper extensions will be added
      fileName: 'core',
      formats: ['umd', 'cjs', 'es'],
    },
    minify: 'esbuild',
    outDir: 'dist/bundle'
  },
});
