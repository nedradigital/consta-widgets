const webpack = require('webpack')
const ora = require('ora')

const clientConfig = require('../config/webpack/client.webpack')

const spinner = ora().start()

const compiler = webpack([clientConfig])

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

      const statsString = stats.toString({
        colors: true,
      })

      spinner.info(statsString)

      if (stats.hasErrors()) {
        process.exit(1)
      }

      resolve()
    })
  })
}

module.exports = {
  build,
  spinner,
}
