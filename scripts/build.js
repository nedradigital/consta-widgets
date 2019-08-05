const chalk = require('chalk')

const { build, spinner } = require('./tools')

spinner.info(chalk.default.bgBlue('Enter build mode'))
;(async () => {
  await build()
  spinner.succeed('Finished building')
})()
