import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Using path.resolve('.') avoids type errors with process.cwd() in some environments.
  const cwd = path.resolve('.');
  const env = loadEnv(mode, cwd, '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': cwd,
      },
    },
    define: {
      // This ensures process.env.API_KEY is replaced with the actual string during build
      // Vercel exposes env vars to the build process, and this injects them into the code.
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      emptyOutDir: true,
    },
    server: {
      port: 3000,
    }
  };
});
