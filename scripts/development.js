const path = require('path')
const chalk = require('chalk')

const clientConfig = require('../config/webpack/client.webpack')
const { common, compiler, createApp, devServer } = require('./tools')

common.spinner.info(chalk.default.magenta('Development mode'))
;(async () => {
  common.spinner.info('Building development server...')

  const app = createApp()

  app.listen({ port: common.port, host: common.host }, async () => {
    const middleware = await devServer(app, compiler)

    app.use(async ctx => {
      const filename = path.resolve(clientConfig.output.path, 'index.html')
      ctx.response.type = 'html'
      ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename)
    })
  })
})()
