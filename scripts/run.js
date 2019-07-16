const fs = require('fs');
const path = require('path');

const runScripts = {
  development: 'development',
  production: 'build',
};

// CTRL/CMD+C interrupts cleanly
process.on('SIGINT', () => {
  process.exit(0);
});

const script = path.resolve('./scripts', `${runScripts[process.env.NODE_ENV]}.js`);

if (!fs.existsSync(script)) {
  // eslint-disable-next-line no-console
  console.error(`Script doesn't exist: ${script}`);
  process.exit(1);
}

require(script);
