const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssRules = [
  {
    ext: 'css',
    use: [],
  },
];

const isProduction = process.env.NODE_ENV === 'production';

// Use generator function for spread in arrays
function* css() {
  const sourceMap = !isProduction;

  for (const rule of cssRules) {
    const use = [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: !isProduction,
        },
      },
      {
        loader: 'css-loader',

        options: {
          importLoaders: rule.use.length + 1,
          sourceMap,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins() {
            return [
              require('postcss-nested'),
              require('postcss-preset-env')({
                stage: 2,
                features: {
                  autoprefixer: true,
                  'color-mod-function': {
                    transformVars: true,
                    importFrom: ['./src/static/variables.css'],
                  },
                },
              }),
              require('cssnano')(),
            ];
          },
          sourceMap,
        },
      },
      ...rule.use,
    ];

    yield {
      test: new RegExp(`\\.${rule.ext}$`),
      use: use.filter(Boolean),
    };
  }
}

module.exports = {
  css,
  cssRules,
};
