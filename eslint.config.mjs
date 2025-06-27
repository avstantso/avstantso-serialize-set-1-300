import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.node  },
  },
  tseslint.configs.recommended,
  {
    ignores: ['.yarn', '**/dist', '**/build',  'coverage', 'jest.config.js', '.pnp*', '**/repository-tools'],
  },
  {
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);
