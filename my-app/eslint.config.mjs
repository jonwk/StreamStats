import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'

const isProduction = process.env.NODE_ENV === 'production'

const rules = isProduction ? {} : {
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
  "react/react-in-jsx-scope": "off",
  'react/function-component-definition': ['error', {
    'namedComponents': 'arrow-function',
    'unnamedComponents': 'arrow-function'
  }]
}

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js, unicorn: eslintPluginUnicorn },
    extends: ['js/recommended'],
    rules: rules,
    settings: {
      'react': {
        'version': 'detect'
      }
    }
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js, unicorn: eslintPluginUnicorn },
    languageOptions: { globals: globals.browser },
    rules: rules,
    settings: {
      'react': {
        'version': 'detect'
      }
    }
  },
  pluginReact.configs.flat.recommended,
])