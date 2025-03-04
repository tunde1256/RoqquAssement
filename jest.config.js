module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    // globalSetup: './jest.setup.js',
  };
  