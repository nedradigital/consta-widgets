const getCommonConfig = require('@gaz/configs/config/webpack/common.webpack')
const webpackMerge = require('webpack-merge')
const omit = require('lodash/omit')

const { withCustomRules } = require('../webpack/helpers')

module.exports = ({ config }) => {
  // Exclude default module rules to fix svg import issue: https://github.com/storybooks/storybook/issues/5926
  const baseSBConfig = omit(config, ['module'])
  const projectConfig = withCustomRules(getCommonConfig({ withDocgen: true }))

  return webpackMerge(baseSBConfig, projectConfig)
}
