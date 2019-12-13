import * as _ from 'lodash'

import { AnyDashboardStateVersion, migrations } from './migrations'

export type Migration<
  From extends AnyDashboardStateVersion,
  To extends AnyDashboardStateVersion
> = {
  versionTo: To['version']
  changes: readonly string[]
  up(from: From): To
  down(from: To): From
}

export const getApplicableMigrations = (
  fromVersion: number,
  toVersion: number
): ReadonlyArray<Migration<any, any>> => {
  const goingUp = toVersion > fromVersion
  const [minVersion, maxVersion] = _.sortBy([fromVersion, toVersion])
  const filteredMigrations = migrations.filter(
    ({ versionTo }) => versionTo > minVersion && versionTo <= maxVersion
  )
  const sortedMigrations = _.sortBy(filteredMigrations, m => m.versionTo)

  return goingUp ? sortedMigrations : [...sortedMigrations].reverse()
}

export const migrate = (data: AnyDashboardStateVersion, toVersion: number) => {
  const fromVersion = data.version || 0
  const goingUp = toVersion > fromVersion
  const migrationsToRun = getApplicableMigrations(fromVersion, toVersion)

  return migrationsToRun.reduce((acc, migration) => migration[goingUp ? 'up' : 'down'](acc), data)
}
