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
    },
    {
      files: [
        "./src/**/index.stories.tsx"
      ],
      rules: {
        "import/no-default-export": ["off"]
      }
    }
  ],
}
