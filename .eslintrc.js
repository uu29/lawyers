const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
env: {
browser: true,
commonjs: true,
es6: true,
node: true,
'jest/globals': true,
},
parser: '@typescript-eslint/parser',
plugins: ['react', 'react-hooks', '@typescript-eslint', 'jest', '@emotion'],
extends: [
'airbnb',
'plugin:react/recommended',
'plugin:@typescript-eslint/recommended',
'plugin:jest/all',
],
parserOptions: {
sourceType: 'module',
ecmaVersion: 2018,
ecmaFeatures: {
jsx: true,
},
},
settings: {
react: {
version: 'detect',
},
},
rules: {
'no-unused-expressions': OFF,
quotes: [ERROR, 'single'],
semi: [ERROR, 'always'],
'no-use-before-define': OFF,
camelcase: OFF,
'no-shadow': OFF,
'max-len': ['error', {
code: 180,
ignoreRegExpLiterals: true,
ignoreUrls: true,
ignoreTemplateLiterals: true,
ignoreComments: true,
ignoreStrings: true,
}],
'import/order': [
'error',
{
groups: [
'builtin',
'external',
'internal',
'parent',
'sibling',
'index',
'object',
'type',
],
pathGroups: [
{
pattern: '{react*,react*/**}',
group: 'external',
position: 'before',
},
{
pattern: '{next*,next*/**}',
group: 'external',
position: 'before',
},
{
pattern: '@/**',
group: 'external',
position: 'before',
},
],
pathGroupsExcludedImportTypes: ['react', 'next'],
alphabetize: {
order: 'asc',
caseInsensitive: true,
},
},
],
'import/export': OFF,
'import/named': OFF,
'import/no-duplicates': OFF,
'import/no-self-import': OFF,
'import/no-cycle': OFF,
'import/no-named-as-default': OFF,
'import/no-named-as-default-member': OFF,
'import/no-useless-path-segments': OFF,
'import/no-unresolved': OFF,
'import/extensions': OFF,
'import/prefer-default-export': OFF,

'react-hooks/rules-of-hooks': ERROR,
'react-hooks/exhaustive-deps': [WARNING, {
additionalHooks: 'useRecoilCallback',
}],
'react/require-default-props': OFF,
'react/jsx-props-no-spreading': OFF,
'react/jsx-filename-extension': [
ERROR,
{ extensions: ['.js', '.jsx', '.ts', '.tsx'] },
],
'react/jsx-wrap-multilines': ERROR,
'react/jsx-max-props-per-line': [ERROR, { maximum: 1 }],
'react/no-array-index-key': OFF,
'react/react-in-jsx-scope': OFF,
'jest/no-mocks-import': OFF,
'jest/no-hooks': OFF,
'padding-line-between-statements': OFF,
'@typescript-eslint/padding-line-between-statements': [
'error',
{ blankLine: 'always', prev: '*', next: ['return', 'interface', 'type', 'function'] },
],
'import/no-extraneous-dependencies': [OFF, { devDependencies: ['**/*.test.js', '**/*.spec.js'] }],

'@typescript-eslint/no-inferrable-types': OFF,
'@typescript-eslint/explicit-function-return-type': OFF,
'@typescript-eslint/explicit-module-boundary-types': OFF,
'@typescript-eslint/consistent-type-imports': 'warn',
'@typescript-eslint/no-unused-expressions': ERROR,
'@typescript-eslint/ban-ts-ignore': OFF,
'@typescript-eslint/no-var-requires': OFF,
'@typescript-eslint/no-shadow': ERROR,
'@typescript-eslint/object-curly-spacing': ['error', 'always'],

'jsx-a11y/label-has-associated-control': [
ERROR,
{
required: {
every: ['nesting', 'id'],
},
},
],
},
overrides: [
{
files: ['**/*.tsx'],
rules: {
'react/prop-types': OFF,
},
},
],
};
