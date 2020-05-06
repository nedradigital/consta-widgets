const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');
const { calcSize } = require('@csssr/gpn-utils/lib/css')

const createRuleForMdx = (options = {}) => ({
  test: /\.mdx?$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        plugins: ['@babel/plugin-transform-react-jsx'],
      },
    },
    {
      loader: '@mdx-js/loader',
      options,
    }
  ],
})

module.exports = {
  withCustomRules(config) {
    let postcssLoaderConfig
    config.module.rules.forEach(rule => {
      postcssLoaderConfig =
        postcssLoaderConfig || rule.use.find(loader => loader.loader === 'postcss-loader')
    })

    if (postcssLoaderConfig) {
      const originalPlugins = postcssLoaderConfig.options.plugins()
      postcssLoaderConfig.options.plugins = () => {
        return [
          require('postcss-functions')({
            functions: {
              'calc-size': function(size) {
                return calcSize(size, isNaN(size))
              },
            },
          }),
          ...originalPlugins,
        ]
      }
    }

    return config
  },
  withMdxRules(config) {
    // Для сборки mdx файлов, которые мы импортируем внутри index.stories.tsx
    config.module.rules.push({
      include: /src|.storybook/,
      ...createRuleForMdx(),
    })

    // Для сборки mdx файлов, которые напрямую подключаются в storybook из папки docs
    config.module.rules.push({
      exclude: /src|.storybook/,
      ...createRuleForMdx({
        compilers: [createCompiler({})],
      }),
    })

    return config
  }
}
