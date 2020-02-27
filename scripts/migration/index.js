const fs = require('fs')
const path = require('path')
const ora = require('ora')

// Пути к директориям не зависящим от текущей версии
const PATH_MIGRATIONS = path.resolve('src/dashboard/migration/migrations')
const PATH_TEMPLATES = path.resolve('scripts/migration')
const PATH_CURRENT_MIGRATION = path.join(PATH_MIGRATIONS, 'current')
const PATH_CURRENT_MIGRATION_TESTS = path.join(PATH_CURRENT_MIGRATION, '__tests__')

const spinner = ora().start()

/**
 * @param {String} path
 */
function getRawData(path) {
  const buffer = fs.readFileSync(path)
  return buffer.toString()
}

/**
 * @param {String} path
 */
function createFolder(path) {
  try {
    fs.accessSync(path)
  } catch (_) {
    fs.mkdirSync(path)
  }
}

/**
 *  @param {Array<String>} paths
 */
function createFolders(paths) {
  paths.forEach(createFolder)
}

/**
 * @param {String} raw
 */
function getCurrentVersion(raw) {
  const [_, version] = raw.match(/(?:versionTo:\s)(\d+)/)

  if (!version) {
    throw new Error('поле `versionTo` не содержит номер текущей версии')
  }

  return Number(version)
}

spinner.info('Чтение исходных файлов')
const sourceMigration = getRawData(path.join(PATH_CURRENT_MIGRATION, 'index.ts'))
const sourceMigrationTest = getRawData(path.join(PATH_CURRENT_MIGRATION_TESTS, 'index.ts'))
const sourceMigrationTestTemplate = getRawData(path.join(PATH_TEMPLATES, 'test.tpl'))
const sourceMigrationsRegister = getRawData(path.join(PATH_MIGRATIONS, 'index.ts'))

const version = getCurrentVersion(sourceMigration)
const nextVersion = version + 1

// Пути к директориям зависящим от текущей версии
const PATH_PREV_MIGRATION = path.join(PATH_MIGRATIONS, `dashboard${version}`)
const PATH_PREV_MIGRATION_TESTS = path.join(PATH_PREV_MIGRATION, '__tests__')

spinner.info('Создание директорий для новой миграции')
createFolders([PATH_PREV_MIGRATION, PATH_PREV_MIGRATION_TESTS])

spinner.info('Регистрация миграции в реестре всех миграций')
fs.writeFileSync(
  path.join(PATH_MIGRATIONS, 'index.ts'),
  sourceMigrationsRegister
    .replace(
      /(\/\/ MIGRATION_GENERATION:ADD_IMPORT)/g,
      `import { Dashboard${version}, migration${version} } from './dashboard${version}'\n$1`
    )
    .replace(
      /(?!\n)(\s+)(\/\/ MIGRATION_GENERATION:ADD_STATE)/g,
      `$1| Dashboard${version}.State\n$1$2`
    )
    .replace(
      /(?!\n)(\s+)(\/\/ MIGRATION_GENERATION:ADD_MIGRATION)/g,
      `$1migration${version},\n$1$2`
    )
)

spinner.info('Создание новой миграции')
fs.writeFileSync(
  path.join(PATH_PREV_MIGRATION, 'index.ts'),
  sourceMigration
    .replace(/CurrentDashboard/g, `Dashboard${version}`)
    .replace(/currentMigration/g, `migration${version}`)
    .replace(/(?!\n)(\s+)(\/\/ MIGRATION_GENERATION:METHOD:(START|END))\n/g, '')
)

fs.writeFileSync(
  path.join(PATH_PREV_MIGRATION_TESTS, 'index.ts'),
  sourceMigrationTest
    .replace(/CurrentDashboard/g, `Dashboard${version}`)
    .replace(/currentMigration/g, `migration${version}`)
)

spinner.info('Обновление текущей миграции')
fs.writeFileSync(
  path.join(PATH_CURRENT_MIGRATION, 'index.ts'),
  sourceMigration
    .replace(/((?:D|d)ashboard)(?:\d+)/g, `$1${version}`)
    .replace(/(type State(?:\n?|.)+?version:\s)(?:\d+)/, `$1${nextVersion}`)
    .replace(/(versionTo:\s)(\d+)/, `$1${nextVersion}`)
    .replace(/changes:\s\[(\n?|.)+?\]/, 'changes: []')
    .replace(
      /(\/\/ MIGRATION_GENERATION:METHOD:START)\n(\s+)(\w+\:)(?:\n|.(?!MIGRATION_GENERATION:METHOD:END))+(\/\/ MIGRATION_GENERATION:METHOD:END)/g,
      `$1\n$2$3 () => {},\n$2$4`
    )
)

fs.writeFileSync(
  path.join(PATH_CURRENT_MIGRATION_TESTS, 'index.ts'),
  sourceMigrationTestTemplate
    .replace(/{{PREV_VERSION}}/g, version)
    .replace(/{{NEXT_VERSION}}/g, nextVersion)
)

spinner.succeed('Создание новой миграции завершено')
