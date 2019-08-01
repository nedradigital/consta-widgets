const koaCors = require('kcors')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaWebpack = require('koa-webpack')
const webpack = require('webpack')
const mergeWith = require('lodash/mergeWith')
const ora = require('ora')

const clientConfig = require('../config/webpack/client.webpack')

const common = {
  isProduction: process.env.NODE_ENV === 'production',
  host: process.env.HOST || '127.0.0.1',
  port: (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000,
  websocketPort: (process.env.WS_PORT && parseInt(process.env.WS_PORT, 10)) || undefined,
  spinner: ora().start(),
}

const compiler = webpack([clientConfig])

function build() {
  return new Promise(resolve => {
    compiler.run((error, stats) => {
      if (error) {
        common.spinner.fail(error.message)
        if (error.stack) {
          common.spinner.fail(error.stack)
        }

        process.exit(1)
      }

      const statsString = stats.toString({
        colors: true,
      })

      common.spinner.info(statsString)

      if (stats.hasErrors()) {
        process.exit(1)
      }

      resolve()
    })
  })
}

async function devServer(koaApp, webpackCompiler, opt) {
  const hotClient = {
    host: common.host,
  }

  if (common.websocketPort) {
    hotClient.port = common.websocketPort
  }

  const defaultOptions = {
    compiler: webpackCompiler,
    devMiddleware: {
      logLevel: 'info',
      publicPath: clientConfig.output.publicPath,
      stats: {
        colors: true,
        all: false,
        timings: true,
        moduleTrace: true,
        errors: true,
        errorDetails: true,
        warnings: true,
      },
    },
    hotClient,
  }

  const koaWebpackMiddleware = await KoaWebpack(mergeWith(defaultOptions, opt))
  koaApp.use(koaWebpackMiddleware)
  webpackCompiler.hooks.done.tap('built', () => {
    common.spinner.succeed(`Running on http://localhost:${common.port}`)
  })

  return koaWebpackMiddleware
}

function createApp() {
  const router = new KoaRouter().get('/favicon.ico', async ctx => {
    ctx.status = 204
  })

  const app = new Koa()
    .use(koaCors())
    .use(async (ctx, next) => {
      try {
        await next()
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Error:', e)
        ctx.status = 500
        ctx.body = 'There was an error. Please try again later.'
      }
    })
    .use(async (ctx, next) => {
      const start = Date.now()
      await next()
      const end = Date.now()
      ctx.set('Response-Time', `${end - start}ms`)
    })

  app.use(router.allowedMethods()).use(router.routes())

  return app
}

module.exports = {
  createApp,
  devServer,
  build,
  compiler,
  common,
}
