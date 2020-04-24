module.exports = {
  extends: [
    require.resolve('@csssr/gpn-configs/eslintrc'),
  ],
  overrides: [
    {
      files: [
        "./src/migrations/**/*.ts"
      ],
      rules: {
        "ordered-imports": "off",
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              "@/*",
              "**/components/**/*",
              "**/contexts/**/*",
              "**/dashboard/**/*",
              "**/ui/**/*",
              "**/utils/**/*",
              "**/widget-helpers/**/*",
              "**/widgets/**/*"
            ]
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
