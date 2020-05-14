import { CurrentDashboard, currentMigration, widgetIdsByType as currentWidgetIdsByType } from '../'
import { Dashboard17 as PreviousDashboard } from '../../dashboard17'

const TornadoChartWidget = {
  type: 'widget',
  widgetType: currentWidgetIdsByType.TornadoChartWidget,
  id: currentWidgetIdsByType.TornadoChartWidget,
  debugName: 'tornado_chart_1',
  params: {
    valuesTicks: 1,
    gridTicks: 1,
    xAxisShowPosition: 'bottom',
    yAxisShowPosition: 'left',
  },
} as const

describe('currentMigration', () => {
  it('повышает версию', () => {
    const source: PreviousDashboard.State = {
      version: 17,
      boxes: [],
      config: {},
      settings: {},
    }

    const result: CurrentDashboard.State = {
      version: 18,
      boxes: [],
      config: {},
      settings: {},
    }

    expect(currentMigration.up(source)).toEqual(result)
  })

  it('понижает версию', () => {
    const source: CurrentDashboard.State = {
      version: 18,
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
                    {
                      ...TornadoChartWidget,
                    },
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
            displays: [[{ ...TornadoChartWidget }]],
            params: {},
          },
        ],
        Box2: [{ ...TornadoChartWidget }],
      },
      settings: {},
    }

    const result: PreviousDashboard.State = {
      version: 17,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'grid',
            grid: {
              columnParams: [],
              rowParams: [],
              items: [[[]]],
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
        Box2: [],
      },
      settings: {},
    }

    expect(currentMigration.down(source)).toEqual(result)
  })
})
