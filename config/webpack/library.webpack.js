const path = require('path')
const webpackMerge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const getCommonConfig = require('./common.webpack')
const isProduction = process.env.NODE_ENV === 'production'

const libConfig = {
  entry: [path.resolve(__dirname, '..', '..', 'src')],
  optimization: isProduction
    ? {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
    }
    : undefined,
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '..', '..', 'lib'),
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  plugins: [new CleanWebpackPlugin()],
}

module.exports = webpackMerge(getCommonConfig({ isLibBuilding: true }), libConfig)
