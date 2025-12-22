import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import stylistic from '@stylistic/eslint-plugin';
import checkFile from 'eslint-plugin-check-file';

export default defineConfig(
  {
    ignores: [
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'dist/**',
    ],
  },

  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,

  {
    plugins: {
      '@stylistic': stylistic,
      'check-file': checkFile,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],

      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],

      '@stylistic/space-infix-ops': 'error',
      '@stylistic/type-annotation-spacing': ['error', { before: false, after: true }],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],

      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/eol-last': ['error', 'always'],

      '@stylistic/max-len': ['warn', {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      }],

      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      ],
    },
  },

  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
    },
  },

  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-focused-test': 'error',
      'playwright/no-wait-for-timeout': 'error',
    },

  },
  
);
