import { CurrentDashboard, currentMigration, widgetIdsByType as currentWidgetIdsByType } from '../'
import {
  Dashboard15 as PreviousDashboard,
  widgetIdsByType as previousWidgetIdsByType,
} from '../../dashboard15'
import { StatsParams as PreviousStatsParams } from '../../dashboard15/widget-params'
import { StatsParams as CurrentStatsParams } from '../widget-params'

const createCurrentStatsWidget = (name: string, size: CurrentStatsParams['size'] = 'xs') =>
  ({
    type: 'widget',
    debugName: name,
    id: name,
    widgetType: currentWidgetIdsByType.StatsWidget,
    params: {
      layout: 'full',
      size,
    },
  } as const)

const createPreviousStatsWidget = (name: string, size: PreviousStatsParams['size'] = 'xs') =>
  ({
    type: 'widget',
    debugName: name,
    id: name,
    widgetType: previousWidgetIdsByType.StatsWidget,
    params: {
      layout: 'full',
      size,
    },
  } as const)

describe('currentMigration', () => {
  it('повышает версию', () => {
    const source: PreviousDashboard.State = {
      version: 15,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'grid',
            grid: {
              columnParams: [],
              rowParams: [],
              items: [[[createPreviousStatsWidget('stats_widget_0')]]],
            },
            params: {},
          },
        ],
        Box1: [
          {
            type: 'switch',
            id: 'switch',
            displays: [[createPreviousStatsWidget('stats_widget_1')]],
            params: {},
          },
        ],
        Box2: [createPreviousStatsWidget('stats_widget_2')],
      },
      settings: {},
    }

    const result: CurrentDashboard.State = {
      version: 16,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'grid',
            grid: {
              columnParams: [],
              rowParams: [],
              items: [[[createCurrentStatsWidget('stats_widget_0')]]],
            },
            params: {},
          },
        ],
        Box1: [
          {
            type: 'switch',
            id: 'switch',
            displays: [[createCurrentStatsWidget('stats_widget_1')]],
            params: {},
          },
        ],
        Box2: [createCurrentStatsWidget('stats_widget_2')],
      },
      settings: {},
    }

    expect(currentMigration.up(source)).toEqual(result)
  })

  it('понижает версию', () => {
    const source: CurrentDashboard.State = {
      version: 16,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'grid',
            grid: {
              columnParams: [],
              rowParams: [],
              items: [[[createCurrentStatsWidget('stats_widget_0', '2xs')]]],
            },
            params: {},
          },
        ],
        Box1: [
          {
            type: 'switch',
            id: 'switch',
            displays: [[createCurrentStatsWidget('stats_widget_1', '2xs')]],
            params: {},
          },
        ],
        Box2: [createCurrentStatsWidget('stats_widget_2', 'm')],
        Box3: [
          {
            type: 'widget',
            widgetType: currentWidgetIdsByType.LinearChartWidget,
            id: 'linear_chart_1',
            debugName: 'linear_chart_1',
            params: {},
          },
        ],
      },
      settings: {},
    }

    const result: PreviousDashboard.State = {
      version: 15,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'grid',
            grid: {
              columnParams: [],
              rowParams: [],
              items: [[[createPreviousStatsWidget('stats_widget_0')]]],
            },
            params: {},
          },
        ],
        Box1: [
          {
            type: 'switch',
            id: 'switch',
            displays: [[createPreviousStatsWidget('stats_widget_1')]],
            params: {},
          },
        ],
        Box2: [createPreviousStatsWidget('stats_widget_2', 'm')],
        Box3: [
          {
            type: 'widget',
            widgetType: previousWidgetIdsByType.LinearChartWidget,
            id: 'linear_chart_1',
            debugName: 'linear_chart_1',
            params: {},
          },
        ],
      },
      settings: {},
    }

    expect(currentMigration.down(source)).toEqual(result)
  })
})
