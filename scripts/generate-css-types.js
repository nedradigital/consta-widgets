const webpack = require('webpack')
const glob = require('glob')
const ora = require('ora')

const { css } = require('../config/webpack/css')
const files = require('../config/webpack/files')

const spinner = ora().start()

const compiler = webpack({
  mode: 'development',
  entry: {
    css: glob.sync('./src/**/*.css'),
  },
  module: {
    rules: [...css({ onlyGenerateTypes: true })],
    noParse: content => files.fonts.test(content) || files.images.test(content),
  },
})

function build() {
  return new Promise(resolve => {
    compiler.run((error, stats) => {
      if (error) {
        spinner.fail(error.message)
        if (error.stack) {
          spinner.fail(error.stack)
        }

        process.exit(1)
      }

      if (stats.hasErrors()) {
        const statsString = stats.toString({
          colors: true,
        })

        spinner.info(statsString)

        process.exit(1)
      }

      resolve()
    })
  })
}

spinner.info('Start generating CSS types')
;(async () => {
  await build()
  spinner.succeed('CSS types generated')
})()
