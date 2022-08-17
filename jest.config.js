module.exports = {
  rootDir: './',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },
  verbose: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ['<rootDir>/test/test-utils.js'],
  testEnvironment: 'jsdom',
};
