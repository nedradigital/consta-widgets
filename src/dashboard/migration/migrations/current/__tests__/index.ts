import { widgetId as textWidgetId } from '@/widgets/TextWidget'

import { CurrentDashboard, currentMigration } from '../'
import { Dashboard10 } from '../../dashboard10'
import CommonBoxItemParams = CurrentDashboard.CommonBoxItemParams

const createTextWidget = (name: string, params = {}) =>
  ({
    type: 'widget',
    debugName: name,
    id: name,
    widgetType: textWidgetId,
    params,
  } as const)

const commonBoxItemsParams: CommonBoxItemParams & { datasetId?: string } = {
  datasetId: '123',
  fallbackPlaceholderText: '123',
  growRatio: 0,
  marginTop: '2xs',
}

const commonTextWidgetParams = {
  text: 'Заголовок1',
  croppedLineCount: 0,
  croppedWithGradient: false,
}

const advancedTextWidgetParams = {
  type: 'advanced',
  font: 'mono',
  align: 'center',
  decoration: 'underline',
}

describe('currentMigration', () => {
  it('повышает версию', () => {
    const widgetParams = {
      type: 'text1',
      ...commonBoxItemsParams,
      ...commonTextWidgetParams,
    }
    const source: Dashboard10.State = {
      version: 10,
      boxes: [],
      config: {
        Box0: [createTextWidget('1', widgetParams)],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [[createTextWidget('1.1', widgetParams)]],
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
                // Строка 1
                [[createTextWidget('col1-1', widgetParams)]],
              ],
            },
            params: {},
          },
        ],
      },
      settings: {},
    }

    const result: CurrentDashboard.State = {
      version: 11,
      boxes: [],
      config: {
        Box0: [createTextWidget('1', widgetParams)],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [[createTextWidget('1.1', widgetParams)]],
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
                // Строка 1
                [[createTextWidget('col1-1', widgetParams)]],
              ],
            },
            params: {},
          },
        ],
      },
      settings: {},
    }

    expect(currentMigration.up(source)).toEqual(result)
  })

  it('понижает версию', () => {
    const sourceBasicTextWidgetParams = {
      type: 'heading1',
      ...commonBoxItemsParams,
      ...commonTextWidgetParams,
    }

    const sourceAdvancedTextWidgetParams = {
      ...commonBoxItemsParams,
      ...commonTextWidgetParams,
      ...advancedTextWidgetParams,
    }

    const resultBasicTextWidgetParams = {
      type: 'text1',
      ...commonBoxItemsParams,
      ...commonTextWidgetParams,
    }

    const sourceBasicMode: CurrentDashboard.State = {
      version: 11,
      boxes: [],
      config: {
        Box0: [createTextWidget('1', sourceBasicTextWidgetParams)],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [[createTextWidget('1.1', sourceBasicTextWidgetParams)]],
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
                // Строка 1
                [[createTextWidget('col1-1', sourceBasicTextWidgetParams)]],
              ],
            },
            params: {},
          },
        ],
      },
      settings: {},
    }

    const resultBasicMode: Dashboard10.State = {
      version: 10,
      boxes: [],
      config: {
        Box0: [createTextWidget('1', sourceBasicTextWidgetParams)],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [[createTextWidget('1.1', sourceBasicTextWidgetParams)]],
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
                // Строка 1
                [[createTextWidget('col1-1', sourceBasicTextWidgetParams)]],
              ],
            },
            params: {},
          },
        ],
      },
      settings: {},
    }

    const sourceExtendedMode: CurrentDashboard.State = {
      version: 11,
      boxes: [],
      config: {
        Box0: [createTextWidget('1', sourceAdvancedTextWidgetParams)],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [[createTextWidget('1.1', sourceAdvancedTextWidgetParams)]],
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
                // Строка 1
                [
                  // Колонка 1
                  [createTextWidget('col1-1', sourceAdvancedTextWidgetParams)],
                ],
              ],
            },
            params: {},
          },
        ],
      },
      settings: {},
    }

    const resultExtendedMode: Dashboard10.State = {
      version: 10,
      boxes: [],
      config: {
        Box0: [createTextWidget('1', resultBasicTextWidgetParams)],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [[createTextWidget('1.1', resultBasicTextWidgetParams)]],
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
                // Строка 1
                [[createTextWidget('col1-1', resultBasicTextWidgetParams)]],
              ],
            },
            params: {},
          },
        ],
      },
      settings: {},
    }

    expect(currentMigration.down(sourceBasicMode)).toEqual(resultBasicMode)

    expect(currentMigration.down(sourceExtendedMode)).toEqual(resultExtendedMode)
  })
})
