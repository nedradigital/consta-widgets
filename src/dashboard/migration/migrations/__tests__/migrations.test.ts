import { sortBy, uniq } from 'lodash'

import { migrations } from '../'
import { currentMigration } from '../current'

describe('migrations', () => {
  it('проверка уникальности номеров всех версий', () => {
    const versions = migrations.map(m => m.versionTo)
    const uniqVersions = uniq(versions)

    expect(uniqVersions.length).toEqual(versions.length)
  })

  it('проверка порядка номеров всех версий', () => {
    const versions = sortBy(migrations.map(m => m.versionTo))

    expect(versions.every((version, idx) => version === idx + 1)).toBe(true)
  })

  it('проверка что список изменений в текущей версии не пустой', () => {
    expect(currentMigration!.changes).not.toEqual([])
  })

  it('проверка уникальности списка изменений в последних 2 версиях', () => {
    const previos = migrations.find(m => m.versionTo === currentMigration.versionTo - 1)

    expect(currentMigration!.changes).not.toEqual(previos!.changes)
  })
})
