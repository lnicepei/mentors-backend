// See refernce on https://commitlint.js.org/#/

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-empty': [0],
    'references-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'refactor',
        'test',
        'perf',
        'chore',
        'revert',
        'ci',
        'style',
        'build',
      ],
    ],
  },
  parserPreset: {
    parserOpts: {
      // RegExp pattern: type: RH-666: subject
      headerPattern: '([a-z]*): (.*)$',
    },
  },
};
