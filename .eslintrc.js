const eslintrc = {
  // "extends": ["airbnb", "prettier", "prettier/react"],
  env: {
    es6: true,
    commonjs: true,
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['^~Components*', './src/components'],
          ['^~Modules*', './src/modules'],
          ['^~Pages*', './src/pages'],
          ['^~Styles*', './src/styles'],
          ['^~GlobalUtil*', './src/util'],
          ['^~Images*', './public/images'],
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
    react: {
      version: 'detect',
    },
    linkComponents: [
      // Components used as alts to <a> for linking, eg. <Link to={ url } />
      'Hyperlink',
      { name: 'Link', linkAttribute: 'to' },
    ],
  },
  overrides: [
    {
      files: ['sagas.js'],
      rules: {
        'consistent-return': 'off',
      },
    },
    {
      files: ['selectors.js'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
  ],
  plugins: ['html', 'import'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2021,
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },
  rules: {
    // Eslint rules:
    'arrow-parens': [2, 'as-needed'], // parens around arrow function parameters
    'max-len': [2, { ignoreTrailingComments: true }],
    'no-debugger': 1,
    'no-return-assign': ['error', 'except-parens'],
    'import/no-unresolved': [2, { ignore: ['^~'] }],
    'no-unused-vars': [
      2,
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: 'res|next|^err|^_',
      },
    ],
    'prefer-const': [
      2,
      {
        destructuring: 'all',
      },
    ],
    'arrow-body-style': [2, 'as-needed'],
    'no-unused-expressions': [
      2,
      {
        allowTaggedTemplates: true,
      },
    ],
    'no-console': 1,
    'func-names': [2, 'as-needed'],
    'comma-dangle': [2, 'only-multiline'], // require or disallow trailing commas
    'import/extensions': 0,
    'no-underscore-dangle': 0,
    'react/display-name': 1,
    'react/prefer-stateless-function': [1, { ignorePureComponents: true }],
    'react/forbid-prop-types': [0, { forbid: ['any'] }],
    'react/no-unescaped-entities': 0,
    'react/require-default-props': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    radix: 0,
    'no-shadow': [
      2,
      {
        hoist: 'all',
        allow: ['resolve', 'reject', 'done', 'next', 'err', 'error'],
      },
    ],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        tabs: true,
        tabWidth: 2,
        semi: true,
        jsxSingleQuote: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        arrowParens: 'avoid',
      },
    ],
    'jsx-a11y/media-has-caption': [0],
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        aspects: ['invalidHref'],
      },
    ],
    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: {
          some: ['nesting', 'id'],
        },
        allowChildren: false,
      },
    ],
    // React rules:
    'react/react-in-jsx-scope': [0],
    'react/jsx-curly-brace-presence': 0,
    'react/jsx-no-bind': [2, { allowBind: true, allowArrowFunctions: true }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-array-index-key': 0,
    'class-methods-use-this': 0,
    'no-tabs': 0,
    'react/prop-types': 1,
    'no-plusplus': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
  },
};

module.exports = eslintrc;
