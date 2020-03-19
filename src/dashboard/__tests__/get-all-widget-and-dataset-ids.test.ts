import { widgetIdsByType } from '@/utils/widgets-list'

import { DashboardState, getAllWidgetAndDatasetIds } from '../'

const createTextWidget = (name: string, params = {}) =>
  ({
    type: 'widget',
    debugName: name,
    id: name,
    widgetType: widgetIdsByType.TextWidget,
    params: {
      ...params,
      datasetId: `datasetId${name}`,
    },
  } as const)

describe('getAllWidgetAndDatasetIds', () => {
  it('возвращает список всех widgetId + datasetId на дашборде', () => {
    const config: DashboardState['config'] = {
      Box0: [createTextWidget('1')],
      Box2: [
        {
          type: 'grid',
          grid: {
            columnParams: [{ growRatio: 11 }, { growRatio: 22 }],
            rowParams: [{}],
            items: [
              // Строка 1
              [
                // Колонка 1
                [createTextWidget('1.1a'), createTextWidget('1.1b')],
                // Колонка 2
                [createTextWidget('1.2')],
              ],
              // Строка 2
              [
                // Колонка 1
                [createTextWidget('2.1')],
                // Колонка 2
                [],
              ],
            ],
          },
          params: {
            growRatio: 1,
          },
        },
      ],
      Box4: [
        {
          type: 'grid',
          grid: {
            columnParams: [{}],
            rowParams: [{}],
            items: [
              // Строка 1
              [
                // Колонка 1
                [createTextWidget('4.1a'), createTextWidget('4.1b')],
                // Колонка 2
                [createTextWidget('4.2')],
              ],
              // Строка 2
              [
                // Колонка 1
                [
                  {
                    type: 'switch',
                    id: 'switchId1',
                    displays: [[createTextWidget('4.3')], [createTextWidget('4.4')]],
                    params: {
                      datasetId: 'swtichDatasetId1',
                    },
                  },
                ],
                // Колонка 2
                [],
              ],
            ],
          },
          params: {},
        },
        {
          type: 'switch',
          id: 'switchId2',
          displays: [[createTextWidget('4.5')], [createTextWidget('4.6')]],
          params: {
            datasetId: 'swtichDatasetId2',
          },
        },
      ],
    }

    expect(getAllWidgetAndDatasetIds(config)).toEqual([
      { widgetId: '1', datasetId: 'datasetId1' },
      { widgetId: '1.1a', datasetId: 'datasetId1.1a' },
      { widgetId: '1.1b', datasetId: 'datasetId1.1b' },
      { widgetId: '1.2', datasetId: 'datasetId1.2' },
      { widgetId: '2.1', datasetId: 'datasetId2.1' },
      { widgetId: '4.1a', datasetId: 'datasetId4.1a' },
      { widgetId: '4.1b', datasetId: 'datasetId4.1b' },
      { widgetId: '4.2', datasetId: 'datasetId4.2' },
      { widgetId: 'switchId1', datasetId: 'swtichDatasetId1' },
      { widgetId: '4.3', datasetId: 'datasetId4.3' },
      { widgetId: '4.4', datasetId: 'datasetId4.4' },
      { widgetId: 'switchId2', datasetId: 'swtichDatasetId2' },
      { widgetId: '4.5', datasetId: 'datasetId4.5' },
      { widgetId: '4.6', datasetId: 'datasetId4.6' },
    ])
  })
})
