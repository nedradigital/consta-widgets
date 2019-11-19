const { calcSize } = require('@gaz/utils/lib/css')

module.exports = {
  withCustomRules(config) {
    let postcssLoaderConfig
    config.module.rules.forEach(rule => {
      postcssLoaderConfig = postcssLoaderConfig || rule.use.find(loader => loader.loader === 'postcss-loader')
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
  }
}
