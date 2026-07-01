import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Allow any while learning
      '@typescript-eslint/no-explicit-any': 'off',

      // Use === instead of ==
      eqeqeq: ['error', 'always'],

      // Prefer const when variable is not reassigned
      'prefer-const': 'warn',

      // No accidental debugger
      'no-debugger': 'warn',

      // No unnecessary var
      'no-var': 'error',

      'react-hooks/set-state-in-effect': 'off',

       "react-hooks/exhaustive-deps": "off",

      // React Fast Refresh rule
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    }
  },
])
