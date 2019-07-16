const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const babelConfig = require('./babel');
const { css } = require('./css');

const isProduction = process.env.NODE_ENV === 'production';
const root = path.resolve(__dirname, '..', '..');

const files = {
  fonts: /\.(woff|woff2|(o|t)tf|eot)$/,
  images: /\.(jpe?g|png|gif|svg)$/,
  js: /\.(js|ts|tsx)$/,
};

module.exports = {
  mode: isProduction ? 'production' : 'development',

  output: {
    publicPath: process.env.PUBLIC_PATH || '/',
  },

  module: {
    rules: [
      ...css(),
      {
        exclude: /node_modules/,
        test: files.js,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: false,
              ...babelConfig,

              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              cacheCompression: isProduction,
              compact: isProduction,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                module: 'esnext',
              },
              // Avoid typechecking, to speed up bundling
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: files.fonts,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: `assets/fonts/[name]${isProduction ? '.[hash]' : ''}.[ext]`,
            },
          },
        ],
      },
      {
        test: files.images,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: `assets/img/[name]${isProduction ? '.[hash]' : ''}.[ext]`,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: [path.resolve(root, 'node_modules')],
    alias: {
      '@': path.resolve(root, 'src'),
    },
  },

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },

  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename: 'assets/css/[id].css',
      filename: `assets/css/[name]${isProduction ? '.[contenthash]' : ''}.css`,
    }),
  ],
};
