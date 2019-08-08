const webpackMerge = require('webpack-merge')
const omit = require('lodash/omit')

const getCommonConfig = require('../webpack/common.webpack')

module.exports = ({ config }) => {
  // Exclude default module rules to fix svg import issue: https://github.com/storybooks/storybook/issues/5926
  const baseSBConfig = omit(config, ['module'])

  return webpackMerge(baseSBConfig, getCommonConfig({ withDocgen: true }))
}
