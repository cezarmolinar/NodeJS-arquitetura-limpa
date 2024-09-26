/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/test/.env.ts"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
