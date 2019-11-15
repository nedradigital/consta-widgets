import { Dashboard2, migration2 } from '../'
import { Dashboard1 } from '../../dashboard1'

describe('migration2', () => {
  it('upgrades without settings', () => {
    const source: Dashboard1.State = {
      version: 1,
      boxes: [],
      config: {},
    }
    const result: Dashboard2.State = {
      version: 2,
      boxes: [],
      config: {},
      settings: {},
    }

    expect(migration2.up(source)).toEqual(result)
  })

  it('upgrades with settings', () => {
    const source: Dashboard1.State = {
      version: 1,
      boxes: [],
      config: {},
      settings: { cols: 9 },
    }
    const result: Dashboard2.State = {
      version: 2,
      boxes: [],
      config: {},
      settings: { cols: 9 },
    }

    expect(migration2.up(source)).toEqual(result)
  })

  it('downgrades and keeps settings', () => {
    const source: Dashboard2.State = {
      version: 2,
      boxes: [],
      config: {},
      settings: { cols: 9 },
    }
    const result: Dashboard1.State = {
      version: 1,
      boxes: [],
      config: {},
      settings: { cols: 9 },
    }

    expect(migration2.down(source)).toEqual(result)
  })
})
