module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(expo|@expo|react-native|@react-native|@unimodules|unimodules|sentry-expo|native-base|react-clone-referenced-element|@react-native-community|@react-navigation)/)',
  ],
  moduleNameMapper: {
    '^react-native$': '<rootDir>/__mocks__/react-native.js',
    '^@expo/vector-icons$': '<rootDir>/__mocks__/@expo/vector-icons.js',
    '^react-native-reanimated$': '<rootDir>/__mocks__/react-native-reanimated.js',
    '^react-native-actions-sheet$': '<rootDir>/__mocks__/react-native-actions-sheet.js',
    '^zustand$': '<rootDir>/__mocks__/zustand.js',
    '^zustand/middleware$': '<rootDir>/__mocks__/zustand.js',
    '^\\./LoadingSpinner$': '<rootDir>/__mocks__/LoadingSpinner.js',
    '^types/(.*)$': '<rootDir>/src/types/$1',
    '^api/(.*)$': '<rootDir>/src/api/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^constants/(.*)$': '<rootDir>/src/constants/$1',
    '^stores/(.*)$': '<rootDir>/src/stores/$1',
  },
};