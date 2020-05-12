import { migration1 } from '../dashboard1'
import { migration2 } from '../dashboard2'
import { getApplicableMigrations } from '../utils'

describe('getApplicableMigrations', () => {
  it('формирует список миграций для обновления', () => {
    expect(getApplicableMigrations(0, 2)).toEqual([migration1, migration2])

    expect(getApplicableMigrations(1, 2)).toEqual([migration2])
  })

  it('формирует список миграций для понижения', () => {
    expect(getApplicableMigrations(2, 0)).toEqual([migration2, migration1])

    expect(getApplicableMigrations(2, 1)).toEqual([migration2])
  })

  it('не возвращает миграции, если версия не изменилась', () => {
    expect(getApplicableMigrations(1, 1)).toEqual([])
  })
})
