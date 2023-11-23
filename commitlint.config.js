// See refernce on https://commitlint.js.org/#/

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-empty': [0],
    'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'test', 'chore']],
  },
  parserPreset: {
    parserOpts: {
      // RegExp pattern: type/subject(for example, feat/commitlint)
      headerPattern: '([a-z]*)/(.*)$',
    },
  },
};
