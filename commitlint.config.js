module.exports = {
  extends: [
    "@commitlint/config-angular", // scoped packages are not prefixed
  ],
  rules: {
    "header-max-length": [2, "always", 72 * 2],
  },
};