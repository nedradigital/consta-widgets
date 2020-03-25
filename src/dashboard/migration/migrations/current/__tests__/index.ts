import {
  CurrentDashboard,
  currentMigration,
  widgetIdsByType as CurrentDashboardWidgetIdsByType,
} from '../'
import { Dashboard10, widgetIdsByType as Dashboard10WidgetIdsByType } from '../../dashboard10'
import CommonBoxItemParams = CurrentDashboard.CommonBoxItemParams

const createTextWidget = (
  name: string,
  widgetType: CurrentDashboard.WidgetItem['widgetType'] | Dashboard10.WidgetItem['widgetType'],
  params = {}
) =>
  ({
    type: 'widget',
    debugName: name,
    id: name,
    widgetType,
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

    const result: CurrentDashboard.State = {
      version: 11,
      boxes: [],
      config: {
        Box0: [createTextWidget('1', CurrentDashboardWidgetIdsByType.TextWidget, widgetParams)],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [
              [createTextWidget('1.1', CurrentDashboardWidgetIdsByType.TextWidget, widgetParams)],
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
                      CurrentDashboardWidgetIdsByType.TextWidget,
                      widgetParams
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
        Box0: [
          createTextWidget(
            '1',
            CurrentDashboardWidgetIdsByType.TextWidget,
            sourceBasicTextWidgetParams
          ),
        ],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [
              [
                createTextWidget(
                  '1.1',
                  CurrentDashboardWidgetIdsByType.TextWidget,
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
                      CurrentDashboardWidgetIdsByType.TextWidget,
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

    const sourceExtendedMode: CurrentDashboard.State = {
      version: 11,
      boxes: [],
      config: {
        Box0: [
          createTextWidget(
            '1',
            CurrentDashboardWidgetIdsByType.TextWidget,
            sourceAdvancedTextWidgetParams
          ),
        ],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [
              [
                createTextWidget(
                  '1.1',
                  CurrentDashboardWidgetIdsByType.TextWidget,
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
                      CurrentDashboardWidgetIdsByType.TextWidget,
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

    expect(currentMigration.down(sourceBasicMode)).toEqual(resultBasicMode)

    expect(currentMigration.down(sourceExtendedMode)).toEqual(resultExtendedMode)
  })
})
