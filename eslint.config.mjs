import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    plugins: {
      prettier,
    },
    rules: {
      // Enforce Prettier formatting
      'prettier/prettier': 'warn',

      // Optional: relaxed TypeScript rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',

      // Optional: style preferences
      quotes: ['warn', 'single', { avoidEscape: true }],
      'jsx-quotes': ['warn', 'prefer-double'],
      'prettier/prettier': 'warn',
      semi: ['warn', 'always'],
    },
  },
];

export default eslintConfig;
