const config = require('@gaz/configs/config/webpack/library.webpack.js')

const { withCustomRules } = require('./helpers')

module.exports = withCustomRules(config)
