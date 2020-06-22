module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: ['./jest-setup.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/index.ts',
  ],
};
