const path = require('path')
const { calcSize } = require('@csssr/gpn-utils/lib/css')

// При локальной сборке после изменений в этом конфиге нужно удалить кэш babel-плагина (папка /tmp/bptp-*)
// https://github.com/wbyoung/babel-plugin-transform-postcss#caching

module.exports = ctx => ({
  plugins: [
    require('postcss-functions')({
      functions: {
        'calc-size': function(size) {
          return calcSize(size, isNaN(size))
        },
      },
    }),
    require('postcss-mixins')({
      mixinsFiles: path.join(process.cwd(), 'src/styles/mixins/**/*.css'),
    }),
    require('postcss-nested'),
    require('postcss-preset-env')({
      stage: 2,
      features: {
        autoprefixer: true,
        'custom-selectors': true,
        'nesting-rules': false,
      },
    }),
    require('postcss-url')({
      url: 'inline',
    }),
    require('postcss-modules')({
      getJSON: ctx.extractModules || (() => {}),
      generateScopedName: '[folder]__[local]--[hash:base64:5]',
    }),
    process.env.NODE_ENV === 'production' &&
      // Из-за cssnano при сборке js класс columns (в компоненте Group барчарта) превращается в column-count (при сборке css всё ок)
      !process.env.BUILDING_JS &&
      require('cssnano')(),
  ],
})
