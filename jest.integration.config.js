module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/*.integration.test.ts'],
  setupFiles: ['<rootDir>/jest.integration.setup.js'],
  testTimeout: 15000,
};
