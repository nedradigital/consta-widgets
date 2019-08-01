const chalk = require('chalk')

const { build, common } = require('./tools')

common.spinner.info(chalk.default.bgBlue('Enter build mode'))
;(async () => {
  await build()
  common.spinner.succeed('Finished building')
})()
