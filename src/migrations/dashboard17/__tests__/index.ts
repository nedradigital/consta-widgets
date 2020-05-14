import { Dashboard17, migration17, widgetIdsByType as currentWidgetIdsByType } from '../'
import {
  Dashboard16 as PreviousDashboard,
  widgetIdsByType as previousWidgetIdsByType,
} from '../../dashboard16'
import { TableLegendParams as PreviousTableLegendParams } from '../../dashboard16/widget-params'
import { TableLegendParams as CurrentTableLegendParams } from '../widget-params'

const createCurrentTableLegendWidget = ({
  name,
  size = 's',
  isResizable = true,
  isSortable = true,
}: {
  name: string
  size?: CurrentTableLegendParams['size']
  isResizable?: CurrentTableLegendParams['isResizable']
  isSortable?: CurrentTableLegendParams['isSortable']
}) =>
  ({
    type: 'widget',
    debugName: name,
    id: name,
    widgetType: currentWidgetIdsByType.TableLegendWidget,
    params: {
      size,
      isResizable,
      isSortable,
    },
  } as const)

const createPreviousTableLegendWidget = ({
  name,
  size = 's',
}: {
  name: string
  size?: PreviousTableLegendParams['size']
}) =>
  ({
    type: 'widget',
    debugName: name,
    id: name,
    widgetType: previousWidgetIdsByType.TableLegendWidget,
    params: {
      size,
    },
  } as const)

const createLinearChartWidget = (type: 'previous' | 'current') => {
  const widgetIdsByType = type === 'previous' ? previousWidgetIdsByType : currentWidgetIdsByType

  return {
    type: 'widget',
    widgetType: widgetIdsByType.LinearChartWidget,
    id: 'linear_chart_1',
    debugName: 'linear_chart_1',
    params: {},
  } as const
}

describe('migration17', () => {
  it('повышает версию', () => {
    const source: PreviousDashboard.State = {
      version: 16,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'grid',
            grid: {
              columnParams: [],
              rowParams: [],
              items: [[[createPreviousTableLegendWidget({ name: 'table_legend_widget_0' })]]],
            },
            params: {},
          },
        ],
        Box1: [
          {
            type: 'switch',
            id: 'switch',
            displays: [
              [createPreviousTableLegendWidget({ name: 'table_legend_widget_1', size: 'm' })],
            ],
            params: {},
          },
        ],
        Box2: [createPreviousTableLegendWidget({ name: 'table_legend_widget_2', size: 'l' })],
        Box3: [createLinearChartWidget('previous')],
      },
      settings: {},
    }

    const result: Dashboard17.State = {
      version: 17,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'grid',
            grid: {
              columnParams: [],
              rowParams: [],
              items: [[[createCurrentTableLegendWidget({ name: 'table_legend_widget_0' })]]],
            },
            params: {},
          },
        ],
        Box1: [
          {
            type: 'switch',
            id: 'switch',
            displays: [
              [createCurrentTableLegendWidget({ name: 'table_legend_widget_1', size: 'm' })],
            ],
            params: {},
          },
        ],
        Box2: [createCurrentTableLegendWidget({ name: 'table_legend_widget_2', size: 'l' })],
        Box3: [createLinearChartWidget('current')],
      },
      settings: {},
    }

    expect(migration17.up(source)).toEqual(result)
  })

  it('понижает версию', () => {
    const source: Dashboard17.State = {
      version: 17,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'grid',
            grid: {
              columnParams: [],
              rowParams: [],
              items: [[[createCurrentTableLegendWidget({ name: 'table_legend_widget_0' })]]],
            },
            params: {},
          },
        ],
        Box1: [
          {
            type: 'switch',
            id: 'switch',
            displays: [
              [
                createCurrentTableLegendWidget({
                  name: 'table_legend_widget_1',
                  size: 'm',
                  isResizable: false,
                }),
              ],
            ],
            params: {},
          },
        ],
        Box2: [
          createCurrentTableLegendWidget({
            name: 'table_legend_widget_2',
            size: 'l',
            isSortable: false,
          }),
        ],
        Box3: [createLinearChartWidget('current')],
      },
      settings: {},
    }

    const result: PreviousDashboard.State = {
      version: 16,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'grid',
            grid: {
              columnParams: [],
              rowParams: [],
              items: [[[createPreviousTableLegendWidget({ name: 'table_legend_widget_0' })]]],
            },
            params: {},
          },
        ],
        Box1: [
          {
            type: 'switch',
            id: 'switch',
            displays: [
              [createPreviousTableLegendWidget({ name: 'table_legend_widget_1', size: 'm' })],
            ],
            params: {},
          },
        ],
        Box2: [createPreviousTableLegendWidget({ name: 'table_legend_widget_2', size: 'l' })],
        Box3: [createLinearChartWidget('previous')],
      },
      settings: {},
    }

    expect(migration17.down(source)).toEqual(result)
  })
})
