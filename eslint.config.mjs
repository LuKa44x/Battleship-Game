import { defineConfig } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: compat.extends('eslint:recommended', 'prettier'),

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      'no-unused-vars': ['warn'], // segnala variabili non usate
      'no-undef': 'error', // variabili non dichiarate
      eqeqeq: ['error', 'always'], // usa === invece di ==
      'no-duplicate-case': 'error', // evita case duplicati nello switch

      'prefer-const': 'error', // usa const quando possibile
      'prefer-template': 'warn', // suggerisce template literals invece di concatenazioni
      'arrow-body-style': ['warn', 'as-needed'], // frecce più pulite
      'no-var': 'error', // vieta var, usa let/const
      semi: ['error', 'always'], // obbliga il ; alla fine di ogni riga
      quotes: ['error', 'single'], // forza le singole virgolette
      indent: ['error', 2], // indentazione di 2 spazi
      'no-mixed-spaces-and-tabs': 'error', // non mischiare spazi e tab
      'comma-dangle': ['error', 'always-multiline'], // virgola finale negli oggetti/array multilinea
    },
  },
]);
