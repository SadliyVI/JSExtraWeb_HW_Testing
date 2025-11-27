module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|svg|wav)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(jpg|jpeg|png|svg)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: [],
  globals: {
    "babel-jest": {
      diagnostics: false,
    },
  },

  roots: ["<rootDir>/src"],
};
