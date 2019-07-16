module.exports = {
  moduleNameMapper: {
    '\\.(css|jpg|jpeg|png|gif|webp|svg|ttf|woff|woff2|)$': '<rootDir>/config/jest/mock-files.js'
  },
  modulePathIgnorePatterns: [ '.npm' ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"
  ],
  setupFilesAfterEnv: [
    '<rootDir>/config/jest/setup-tests.js'
  ],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{ts,tsx}",
    "<rootDir>/src/**/?(*.)(spec|test).{ts,tsx}"
  ],
  moduleFileExtensions: [ 'js', 'ts', 'tsx' ],
};
