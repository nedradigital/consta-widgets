import { CurrentDashboard, currentMigration, widgetIdsByType as currentWidgetIdsByType } from '../'
import {
  Dashboard{{PREV_VERSION}} as PreviousDashboard,
  widgetIdsByType as previousWidgetIdsByType
} from '../../dashboard{{PREV_VERSION}}'

describe('currentMigration', () => {
  it('повышает версию', () => {
    const source: PreviousDashboard.State = {
      version: {{PREV_VERSION}},
      boxes: [],
      config: {
        Box0: [
          {
            type: 'grid',
            grid: {
              columnParams: [],
              rowParams: [],
              items: [
                [
                  [
                    /* место для вашего виджета */
                  ],
                ],
              ],
            },
            params: {},
          },
        ],
        Box1: [
          {
            type: 'switch',
            id: 'switch',
            displays: [[]],
            params: {},
          },
        ],
      },
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
      config: {
        Box0: [
          {
            type: 'grid',
            grid: {
              columnParams: [],
              rowParams: [],
              items: [
                [
                  [
                    /* место для вашего виджета */
                  ],
                ],
              ],
            },
            params: {},
          },
        ],
        Box1: [
          {
            type: 'switch',
            id: 'switch',
            displays: [[]],
            params: {},
          },
        ],
      },
      settings: {},
    }

    const result: PreviousDashboard.State = {
      version: {{PREV_VERSION}},
      boxes: [],
      config: {},
      settings: {},
    }

    expect(currentMigration.down(source)).toEqual(result)
  })
})
