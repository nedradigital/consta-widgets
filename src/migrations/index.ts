// tslint:disable:ordered-imports
import { CurrentDashboard, currentMigration } from './current'
import { Dashboard0 } from './dashboard0'
import { Dashboard1, migration1 } from './dashboard1'
import { Dashboard2, migration2 } from './dashboard2'
import { Dashboard3, migration3 } from './dashboard3'
import { Dashboard4, migration4 } from './dashboard4'
import { Dashboard5, migration5 } from './dashboard5'
import { Dashboard6, migration6 } from './dashboard6'
import { Dashboard7, migration7 } from './dashboard7'
import { Dashboard8, migration8 } from './dashboard8'
import { Dashboard9, migration9 } from './dashboard9'
import { Dashboard10, migration10 } from './dashboard10'
import { Dashboard11, migration11 } from './dashboard11'
import { Dashboard12, migration12 } from './dashboard12'
import { Dashboard13, migration13 } from './dashboard13'
import { Dashboard14, migration14 } from './dashboard14'
import { Dashboard15, migration15 } from './dashboard15'
import { Dashboard16, migration16 } from './dashboard16'
import { Dashboard17, migration17 } from './dashboard17'
// MIGRATION_GENERATION:ADD_IMPORT

export type Migration<
  From extends AnyDashboardStateVersion,
  To extends AnyDashboardStateVersion
> = {
  versionTo: To['version']
  changes: readonly string[]
  up(from: From): To
  down(from: To): From
}

export type AnyDashboardStateVersion =
  | Dashboard0.State
  | Dashboard1.State
  | Dashboard2.State
  | Dashboard3.State
  | Dashboard4.State
  | Dashboard5.State
  | Dashboard6.State
  | Dashboard7.State
  | Dashboard8.State
  | Dashboard9.State
  | Dashboard10.State
  | Dashboard11.State
  | Dashboard12.State
  | Dashboard13.State
  | Dashboard14.State
  | Dashboard15.State
  | Dashboard16.State
  | Dashboard17.State
  // MIGRATION_GENERATION:ADD_STATE
  | CurrentDashboard.State

export const migrations = [
  migration1,
  migration2,
  migration3,
  migration4,
  migration5,
  migration6,
  migration7,
  migration8,
  migration9,
  migration10,
  migration11,
  migration12,
  migration13,
  migration14,
  migration15,
  migration16,
  migration17,
  // MIGRATION_GENERATION:ADD_MIGRATION
  currentMigration,
] as const
