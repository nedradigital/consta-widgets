import { Dashboard0 } from './dashboard0'
import { Dashboard1, migration1 } from './dashboard1'
import { Dashboard2, migration2 } from './dashboard2'

export type AnyDashboardStateVersion = Dashboard0.State | Dashboard1.State | Dashboard2.State

export const migrations = [migration1, migration2] as const
