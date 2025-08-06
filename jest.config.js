const { createDefaultPreset } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/index.{ts,tsx}',
    '!src/**/types.{ts,tsx}',
    '!src/**/constants.{ts,tsx}',
    '!src/**/config.{ts,tsx}',
    '!src/**/setup.{ts,tsx}',
    '!src/**/jest.{ts,tsx}',
    '!src/**/stories.{ts,tsx}',
    '!src/**/mocks.{ts,tsx}',
    '!src/**/hooks.{ts,tsx}',
    '!src/**/utils.{ts,tsx}',
    '!src/**/helpers.{ts,tsx}',
    '!src/**/interfaces.{ts,tsx}',
    '!src/**/types.{ts,tsx}',
    '!src/**/constants.{ts,tsx}',
    '!src/**/config.{ts,tsx}',
    '!src/**/theme.{ts,tsx}',
    '!src/**/styles.{ts,tsx}',
    '!src/**/assets.{ts,tsx}',
    '!src/**/public.{ts,tsx}',
    '!src/**/server.{ts,tsx}',
    '!src/**/client.{ts,tsx}',
    '!src/**/api.{ts,tsx}',
    '!src/**/graphql.{ts,tsx}',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  transform: {
    ...tsJestTransformCfg,
  },
};
