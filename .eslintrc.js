module.exports = {
  extends: [
    require.resolve('@csssr/gpn-configs/eslintrc'),
  ],
  overrides: [
    {
      files: [
        "./src/dashboard/migration/migrations/**/*.ts"
      ],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: ["@/*"]
          }
        ]
      }
    }
  ],
}
