module.exports = {
  verbose: true,
  coverageDirectory: 'coverage/',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    'server/**/*.js',
    '!app/**/*.test.js',
    '!src/data/**/*.js', // temp
    '!src/registerServiceWorker.js',
  ],
  coverageThreshold: {
    global: {
      statements: 10,
      branches: 10,
      functions: 10,
      lines: 10,
    },
  },
  setupTestFrameworkScriptFile: '<rootDir>/test-env.js',
  testRegex: 'tests/.*\\.test\\.js$',
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/mocks/image.js',
  },
}
