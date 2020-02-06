import { Dashboard0 } from './dashboard0'
import { Dashboard1, migration1 } from './dashboard1'
import { Dashboard2, migration2 } from './dashboard2'
import { Dashboard3, migration3 } from './dashboard3'
import { Dashboard4, migration4 } from './dashboard4'
import { Dashboard5, migration5 } from './dashboard5'
import { Dashboard6, migration6 } from './dashboard6'
import { Dashboard7, migration7 } from './dashboard7'
import { Dashboard8, migration8 } from './dashboard8'

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

export const migrations = [
  migration1,
  migration2,
  migration3,
  migration4,
  migration5,
  migration6,
  migration7,
  migration8,
] as const
