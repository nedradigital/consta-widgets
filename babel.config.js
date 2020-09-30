const { extname } = require('path')

module.exports = {
  ignore: ['**/*.css.d.ts', '**/*.stories.tsx', '**/__tests__/*'],
  comments: false,
  presets: [
    require('@consta/widgets-configs/config/webpack/babel'),
    require('@babel/preset-typescript').default,
    [
      require('babel-preset-minify'),
      {
        builtIns: false  // // FIXME проблема с babel-plugin-minify-builtins, апдейтнуть когда пофиксят https://github.com/babel/minify/issues/904
      },
    ],
  ],
  plugins: [
    // Добавляем импорт css-файла там, где был импорт css-модулей
    ({ types: t }) => ({
      visitor: {
        ImportDeclaration(path) {
          const stylesheetPath = path.node.source.value
          if (path.node.specifiers.length && extname(stylesheetPath) === '.css') {
            path.insertBefore(t.ImportDeclaration([], t.StringLiteral(stylesheetPath)))
          }
        },
      },
    }),
    require('babel-plugin-transform-postcss'),
    [
      require('babel-plugin-module-resolver'),
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
}
