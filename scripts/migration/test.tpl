import { CurrentDashboard, currentMigration } from '../'
import { Dashboard{{PREV_VERSION}} } from '../../dashboard{{PREV_VERSION}}'

describe('currentMigration', () => {
  it('повышает версию', () => {
    const source: Dashboard{{PREV_VERSION}}.State = {
      version: {{PREV_VERSION}},
      boxes: [],
      config: {},
      settings: {},
    }

    const result: CurrentDashboard.State = {
      version: {{NEXT_VERSION}},
      boxes: [],
      config: {},
      settings: {},
    }

    expect(currentMigration.up(source)).toEqual(result)
  })

  it('понижает версию', () => {
    const source: CurrentDashboard.State = {
      version: {{NEXT_VERSION}},
      boxes: [],
      config: {},
      settings: {},
    }

    const result: Dashboard{{PREV_VERSION}}.State = {
      version: {{PREV_VERSION}},
      boxes: [],
      config: {},
      settings: {},
    }

    expect(currentMigration.down(source)).toEqual(result)
  })
})
