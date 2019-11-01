import { getApplicableMigrations } from '@/dashboard/migration'
import { migration1 } from '@/dashboard/migration/migrations/dashboard1'
import { migration2 } from '@/dashboard/migration/migrations/dashboard2'

describe('getApplicableMigrations', () => {
  it('calculates migrations list for upgrade', () => {
    expect(getApplicableMigrations(0, 2)).toEqual([migration1, migration2])

    expect(getApplicableMigrations(1, 2)).toEqual([migration2])
  })

  it('calculates migrations list for downgrade', () => {
    expect(getApplicableMigrations(2, 0)).toEqual([migration2, migration1])

    expect(getApplicableMigrations(2, 1)).toEqual([migration2])
  })

  it('returns no migrations if version hasnt changed', () => {
    expect(getApplicableMigrations(1, 1)).toEqual([])
  })
})
