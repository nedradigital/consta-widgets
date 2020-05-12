import { Dashboard11, migration11, widgetIdsByType as Dashboard11WidgetIdsByType } from '../'
import { Dashboard10, widgetIdsByType as Dashboard10WidgetIdsByType } from '../../dashboard10'
import CommonBoxItemParams = Dashboard11.CommonBoxItemParams

const createTextWidget = (
  name: string,
  widgetType:
    | typeof Dashboard11WidgetIdsByType.TextWidget
    | typeof Dashboard10WidgetIdsByType.TextWidget,
  params = {}
) =>
  ({
    type: 'widget',
    debugName: name,
    id: name,
    widgetType,
    params: {
      text: 'text',
      type: 'text1',
      ...params,
    },
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

describe('migration11', () => {
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
        Box0: [createTextWidget('1', Dashboard10WidgetIdsByType.TextWidget, widgetParams)],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [
              [createTextWidget('1.1', Dashboard10WidgetIdsByType.TextWidget, widgetParams)],
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
                // Строка 1
                [[createTextWidget('col1-1', Dashboard10WidgetIdsByType.TextWidget, widgetParams)]],
              ],
            },
            params: {},
          },
        ],
      },
      settings: {},
    }

    const result: Dashboard11.State = {
      version: 11,
      boxes: [],
      config: {
        Box0: [createTextWidget('1', Dashboard11WidgetIdsByType.TextWidget, widgetParams)],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [
              [createTextWidget('1.1', Dashboard11WidgetIdsByType.TextWidget, widgetParams)],
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
                // Строка 1
                [[createTextWidget('col1-1', Dashboard11WidgetIdsByType.TextWidget, widgetParams)]],
              ],
            },
            params: {},
          },
        ],
      },
      settings: {},
    }

    expect(migration11.up(source)).toEqual(result)
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

    const sourceBasicMode: Dashboard11.State = {
      version: 11,
      boxes: [],
      config: {
        Box0: [
          createTextWidget('1', Dashboard11WidgetIdsByType.TextWidget, sourceBasicTextWidgetParams),
        ],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [
              [
                createTextWidget(
                  '1.1',
                  Dashboard11WidgetIdsByType.TextWidget,
                  sourceBasicTextWidgetParams
                ),
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
                // Строка 1
                [
                  [
                    createTextWidget(
                      'col1-1',
                      Dashboard11WidgetIdsByType.TextWidget,
                      sourceBasicTextWidgetParams
                    ),
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

    const resultBasicMode: Dashboard10.State = {
      version: 10,
      boxes: [],
      config: {
        Box0: [
          createTextWidget('1', Dashboard10WidgetIdsByType.TextWidget, sourceBasicTextWidgetParams),
        ],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [
              [
                createTextWidget(
                  '1.1',
                  Dashboard10WidgetIdsByType.TextWidget,
                  sourceBasicTextWidgetParams
                ),
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
                // Строка 1
                [
                  [
                    createTextWidget(
                      'col1-1',
                      Dashboard10WidgetIdsByType.TextWidget,
                      sourceBasicTextWidgetParams
                    ),
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

    const sourceExtendedMode: Dashboard11.State = {
      version: 11,
      boxes: [],
      config: {
        Box0: [
          createTextWidget(
            '1',
            Dashboard11WidgetIdsByType.TextWidget,
            sourceAdvancedTextWidgetParams
          ),
          {
            type: 'widget',
            debugName: '2',
            id: '2',
            widgetType: Dashboard11WidgetIdsByType.BarChartWidget,
            params: {
              orientation: 'vertical',
              size: 'm',
              gridTicks: 4,
              valuesTicks: 1,
              showValues: false,
              unitPosition: 'none',
            },
          },
        ],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [
              [
                createTextWidget(
                  '1.1',
                  Dashboard11WidgetIdsByType.TextWidget,
                  sourceAdvancedTextWidgetParams
                ),
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
                // Строка 1
                [
                  // Колонка 1
                  [
                    createTextWidget(
                      'col1-1',
                      Dashboard11WidgetIdsByType.TextWidget,
                      sourceAdvancedTextWidgetParams
                    ),
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

    const resultExtendedMode: Dashboard10.State = {
      version: 10,
      boxes: [],
      config: {
        Box0: [
          createTextWidget('1', Dashboard10WidgetIdsByType.TextWidget, resultBasicTextWidgetParams),
          {
            type: 'widget',
            debugName: '2',
            id: '2',
            widgetType: Dashboard10WidgetIdsByType.BarChartWidget,
            params: {
              orientation: 'vertical',
              size: 'm',
              gridTicks: 4,
              valuesTicks: 1,
              showValues: false,
              unitPosition: 'none',
            },
          },
        ],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [
              [
                createTextWidget(
                  '1.1',
                  Dashboard10WidgetIdsByType.TextWidget,
                  resultBasicTextWidgetParams
                ),
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
                // Строка 1
                [
                  [
                    createTextWidget(
                      'col1-1',
                      Dashboard10WidgetIdsByType.TextWidget,
                      resultBasicTextWidgetParams
                    ),
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

    expect(migration11.down(sourceBasicMode)).toEqual(resultBasicMode)

    expect(migration11.down(sourceExtendedMode)).toEqual(resultExtendedMode)
  })
})
