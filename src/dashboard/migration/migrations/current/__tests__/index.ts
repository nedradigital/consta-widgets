import { CurrentDashboard, currentMigration } from '../'
import { Dashboard13, widgetIdsByType as Dashboard13WidgetIdsByType } from '../../dashboard13'

describe('currentMigration', () => {
  it('повышает версию', () => {
    const source: Dashboard13.State = {
      version: 13,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            widgetType: Dashboard13WidgetIdsByType.LinearChartWidget,
            id: 'linear_chart_1',
            debugName: 'linear_chart_1',
            params: {},
          },
        ],
      },
      settings: {},
    }

    const result: CurrentDashboard.State = {
      version: 14,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            widgetType: Dashboard13WidgetIdsByType.LinearChartWidget,
            id: 'linear_chart_1',
            debugName: 'linear_chart_1',
            params: {},
          },
        ],
      },
      settings: {},
    }

    expect(currentMigration.up(source)).toEqual(result)
  })

  it('понижает версию', () => {
    const source: CurrentDashboard.State = {
      version: 14,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            widgetType: Dashboard13WidgetIdsByType.LinearChartWidget,
            id: 'linear_chart_1',
            debugName: 'linear_chart_1',
            params: {
              direction: 'toRight',
            },
          },
        ],
        Box1: [
          {
            type: 'switch',
            id: 'switch',
            displays: [
              [
                {
                  type: 'widget',
                  widgetType: Dashboard13WidgetIdsByType.LinearChartWidget,
                  id: 'traffic_light_2',
                  debugName: 'traffic_light_2',
                  params: {
                    direction: 'toRight',
                  },
                },
              ],
            ],
            params: {},
          },
        ],
        Box2: [
          {
            type: 'grid',
            grid: {
              columnParams: [],
              rowParams: [],
              items: [
                [
                  [
                    {
                      type: 'widget',
                      widgetType: Dashboard13WidgetIdsByType.LinearChartWidget,
                      id: 'traffic_light_3',
                      debugName: 'traffic_light_3',
                      params: {
                        direction: 'toRight',
                      },
                    },
                  ],
                  [
                    {
                      type: 'widget',
                      widgetType: Dashboard13WidgetIdsByType.ImageWidget,
                      id: 'image',
                      debugName: 'image',
                      params: {
                        growRatio: 222,
                      },
                    },
                  ],
                ],
              ],
            },
            params: {},
          },
        ],
      },
      settings: {},
    }

    const result: Dashboard13.State = {
      version: 13,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            widgetType: Dashboard13WidgetIdsByType.LinearChartWidget,
            id: 'linear_chart_1',
            debugName: 'linear_chart_1',
            params: {},
          },
        ],
        Box1: [
          {
            type: 'switch',
            id: 'switch',
            displays: [
              [
                {
                  type: 'widget',
                  widgetType: Dashboard13WidgetIdsByType.LinearChartWidget,
                  id: 'traffic_light_2',
                  debugName: 'traffic_light_2',
                  params: {},
                },
              ],
            ],
            params: {},
          },
        ],
        Box2: [
          {
            type: 'grid',
            grid: {
              columnParams: [],
              rowParams: [],
              items: [
                [
                  [
                    {
                      type: 'widget',
                      widgetType: Dashboard13WidgetIdsByType.LinearChartWidget,
                      id: 'traffic_light_3',
                      debugName: 'traffic_light_3',
                      params: {},
                    },
                  ],
                  [
                    {
                      type: 'widget',
                      widgetType: Dashboard13WidgetIdsByType.ImageWidget,
                      id: 'image',
                      debugName: 'image',
                      params: {
                        growRatio: 222,
                      },
                    },
                  ],
                ],
              ],
            },
            params: {},
          },
        ],
      },
      settings: {},
    }

    expect(currentMigration.down(source)).toEqual(result)
  })
})
