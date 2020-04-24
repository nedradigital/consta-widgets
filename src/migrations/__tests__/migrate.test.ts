import * as _ from 'lodash'

import { Dashboard0 } from '../dashboard0'
import { migration1 } from '../dashboard1'
import { Dashboard2, migration2 } from '../dashboard2'
import { migrate } from '../utils'

const dashboard0Data: Dashboard0.State = {
  boxes: [],
  config: {},
}
const dashboard2Data: Dashboard2.State = {
  version: 2,
  boxes: [],
  config: {},
  settings: {},
}

describe('migration', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('мигрирует вверх', () => {
    const migration1Spy = jest.spyOn(migration1, 'up')
    const migration2Spy = jest.spyOn(migration2, 'up')

    const result = migrate(dashboard0Data, 2)

    expect(migration1Spy).toHaveBeenCalled()
    expect(migration2Spy).toHaveBeenCalled()
    expect(migration2Spy).toHaveBeenCalledAfter(migration1Spy as jest.Mock)

    expect(result).toEqual(_.flow(migration1.up, migration2.up)(dashboard0Data))
  })

  it('мигрирует вниз', () => {
    const migration1Spy = jest.spyOn(migration1, 'down')
    const migration2Spy = jest.spyOn(migration2, 'down')

    const result = migrate(dashboard2Data, 0)

    expect(migration2Spy).toHaveBeenCalled()
    expect(migration1Spy).toHaveBeenCalled()
    expect(migration1Spy).toHaveBeenCalledAfter(migration2Spy as jest.Mock)

    expect(result).toEqual(_.flow(migration2.down, migration1.down)(dashboard2Data))
  })

  it('ничего не делает, если версия та же самая', () => {
    expect(migrate(dashboard0Data, 0)).toEqual(dashboard0Data)
  })
})
