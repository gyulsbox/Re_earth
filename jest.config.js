const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@components/(.*)": "<rootDir>/components/$1",
    "^@hooks/(.*)": "<rootDir>/hooks/$1",
    "^@pages/(.*)": "<rootDir>/pages/$1",
    "^@libs/(.*)": "<rootDir>/libs/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
