import { Dashboard14, migration14, widgetIdsByType as currentWidgetIdsByType } from '../'
import {
  Dashboard13 as PreviousDashboard,
  widgetIdsByType as previousWidgetIdsByType,
} from '../../dashboard13'

describe('migration14', () => {
  it('повышает версию', () => {
    const source: PreviousDashboard.State = {
      version: 13,
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
                      type: 'widget',
                      widgetType: previousWidgetIdsByType.LinearChartWidget,
                      id: 'linear_chart_1',
                      debugName: 'linear_chart_1',
                      params: {},
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
            displays: [[]],
            params: {},
          },
        ],
      },
      settings: {},
    }

    const result: Dashboard14.State = {
      version: 14,
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
                      type: 'widget',
                      widgetType: currentWidgetIdsByType.LinearChartWidget,
                      id: 'linear_chart_1',
                      debugName: 'linear_chart_1',
                      params: {},
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
            displays: [[]],
            params: {},
          },
        ],
      },
      settings: {},
    }

    expect(migration14.up(source)).toEqual(result)
  })

  it('понижает версию', () => {
    const source: Dashboard14.State = {
      version: 14,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            widgetType: currentWidgetIdsByType.LinearChartWidget,
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
                  widgetType: currentWidgetIdsByType.LinearChartWidget,
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
                      widgetType: currentWidgetIdsByType.LinearChartWidget,
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
                      widgetType: currentWidgetIdsByType.ImageWidget,
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

    const result: PreviousDashboard.State = {
      version: 13,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            widgetType: previousWidgetIdsByType.LinearChartWidget,
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
                  widgetType: previousWidgetIdsByType.LinearChartWidget,
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
                      widgetType: previousWidgetIdsByType.LinearChartWidget,
                      id: 'traffic_light_3',
                      debugName: 'traffic_light_3',
                      params: {},
                    },
                  ],
                  [
                    {
                      type: 'widget',
                      widgetType: previousWidgetIdsByType.ImageWidget,
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

    expect(migration14.down(source)).toEqual(result)
  })
})
