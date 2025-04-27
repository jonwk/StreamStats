import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  js.configs.recommended,
  ...compat.extends(['next']),
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      ...compat.plugins(['react', 'unicorn'])
    },
    rules: {
      'semi': ['error', 'never'],
      'quotes': ['error', 'single', {
        'avoidEscape': true
      }],
      'no-multi-spaces': 'error',
      'comma-spacing': ['error', {
        'before': false,
        'after': true
      }],
      'object-curly-spacing': ['error', 'always'],
      'padding-line-between-statements': ['error', {
        'blankLine': 'never',
        'prev': 'import',
        'next': 'import'
      }],
      'unicorn/filename-case': ['error', {
        'cases': {
          'camelCase': true,
          'pascalCase': true
        }
      }],
      'unicorn/prevent-abbreviations': ['error', {
        'allowList': {
          'args': true,
          'props': true,
          'Props': true,
          'prop': true,
          'ref': true,
          'Ref': true,
          'temp': true
        }
      }],
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-array-for-each': 'off',
      'react/prop-types': 'off',
      'react/function-component-definition': ['error', {
        'namedComponents': 'arrow-function',
        'unnamedComponents': 'arrow-function'
      }]
    }
  }
]

export default eslintConfig
