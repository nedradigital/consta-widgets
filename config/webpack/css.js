const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cssRules = [
  {
    ext: 'css',
    use: [],
  },
]

const isProduction = process.env.NODE_ENV === 'production'

// Use generator function for spread in arrays
function* css({ onlyGenerateTypes } = {}) {
  for (const rule of cssRules) {
    const use = [
      onlyGenerateTypes
        ? null
        : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: !isProduction,
          },
        },
      !isProduction || onlyGenerateTypes ? 'css-modules-typescript-loader' : null,
      {
        loader: 'css-loader',

        options: {
          importLoaders: rule.use.length + 1,
          modules: {
            localIdentName: isProduction ? '[hash:base64:5]' : '[folder]__[local]--[hash:base64:5]',
          },
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins() {
            return [
              require('postcss-nested'),
              require('postcss-preset-env')({
                stage: 2,
                features: {
                  autoprefixer: true,
                  'custom-selectors': true,
                  'nesting-rules': true,
                },
              }),
              isProduction && require('cssnano')(),
            ].filter(Boolean)
          },
        },
      },
      ...rule.use,
    ]

    yield {
      test: new RegExp(`\\.${rule.ext}$`),
      use: use.filter(Boolean),
    }
  }
}

module.exports = {
  css,
  cssRules,
}
