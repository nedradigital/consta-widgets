const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        // Allow importing core-js in entrypoint and use browserlist to select polyfills
        useBuiltIns: 'entry',
        // Set the corejs version we are using to avoid warnings in console
        // This will need to change once we upgrade to corejs@3
        corejs: 3,
        // Do not transform modules to CJS
        modules: false,
        // Exclude transforms that make all code slower
        exclude: ['transform-typeof-symbol'],
      },
    ],
    [
      '@babel/react',
      {
        // Adds component stack to warning messages
        // Adds __self attribute to JSX which React will use for some warnings
        development: !isProduction,
        // Will use the native built-in instead of trying to polyfill
        // behavior for any plugins that require one.
        useBuiltIns: true,
      },
    ],
  ],
  plugins: [
    ['@babel/proposal-class-properties', { loose: true }],
    [
      '@babel/proposal-object-rest-spread',
      {
        useBuiltIns: true,
      },
    ],
    // Polyfills the runtime needed for async/await, generators, and friends
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime
    [
      '@babel/transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: true,
      },
    ],
    [
      'named-asset-import',
      {
        loaderMap: {
          svg: {
            ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
          },
        },
      },
    ],
    ...(isProduction
      ? [
        // Treat React JSX elements as value types and hoist them to the highest scope
        // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-constant-elements
        '@babel/transform-react-constant-elements',

        // Replaces the React.createElement function with one that is more optimized for production
        // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-inline-elements
        '@babel/transform-react-inline-elements',

        // Remove unnecessary React propTypes from the production build
        // https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types
        [
          'transform-react-remove-prop-types',
          {
            removeImport: true,
          },
        ],
      ]
      : ['react-hot-loader/babel']),
  ],
}
