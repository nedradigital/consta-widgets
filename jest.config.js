const SLASH = "[/\\\\]"

module.exports = {
  ...require('@csssr/gpn-configs/jest.config.js'),
  transformIgnorePatterns: [
    // Транспайлим библиотеки на es-модулях в commonjs-модули
    `${SLASH}node_modules${SLASH}(?!(react-dnd|dnd-core|react-dnd-html5-backend|@amcharts/amcharts4-geodata)${SLASH}).+\\.(js|jsx|ts|tsx)`,
  ],
  coverageThreshold: {
    "./src/common/utils/": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    },
    "./src/**/helpers.ts": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    },
  }
};
