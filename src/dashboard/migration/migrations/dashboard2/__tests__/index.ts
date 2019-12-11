import { Dashboard2, migration2 } from '../'
import { Dashboard1 } from '../../dashboard1'

describe('migration2', () => {
  it('повышает версию без настроек', () => {
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

  it('повышает версию с настройками', () => {
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

  it('понижает версию и сохраняет настройки', () => {
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
