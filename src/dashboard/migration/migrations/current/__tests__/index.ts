import {
  CurrentDashboard,
  currentMigration,
  widgetIdsByType as CurrentDashboardWidgetIdsByType,
} from '../'
import { Dashboard11, widgetIdsByType as Dashboard11WidgetIdsByType } from '../../dashboard11'
import CommonBoxItemParams = CurrentDashboard.CommonBoxItemParams

const commonBoxItemsParams: CommonBoxItemParams & { datasetId?: string } = {
  marginTop: '2xs',
  growRatio: 0,
  fallbackPlaceholderText: '123',
  datasetId: '123',
}

const commonTextWidgetParams = {
  text: 'Заголовок1',
  croppedLineCount: 0,
  croppedWithGradient: false,
}

const createTextWidget = (
  name: string,
  widgetType:
    | typeof CurrentDashboardWidgetIdsByType.TextWidget
    | typeof Dashboard11WidgetIdsByType.TextWidget,
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

const createCheckboxWidget = (
  name: string,
  widgetType:
    | typeof CurrentDashboardWidgetIdsByType.CheckboxWidget
    | typeof Dashboard11WidgetIdsByType.CheckboxWidget
) =>
  ({
    type: 'widget',
    debugName: name,
    id: name,
    widgetType,
    params: {
      size: 'm',
      content: 'Выбор',
      ...commonBoxItemsParams,
    },
  } as const)

describe('currentMigration', () => {
  it('повышает версию', () => {
    const widgetExtendedModeParamsBeforeUpdate = {
      ...commonBoxItemsParams,
      ...commonTextWidgetParams,
      type: 'advanced',
    }

    const widgetExtendedModeParamsAfterUpdate = {
      ...commonBoxItemsParams,
      ...commonTextWidgetParams,
      type: 'advanced',
      view: undefined,
    }

    const widgetBasicModeParams = {
      ...commonBoxItemsParams,
      ...commonTextWidgetParams,
      type: 'text1',
    }

    const sourceExtendedMode: Dashboard11.State = {
      version: 11,
      boxes: [],
      config: {
        Box0: [
          createTextWidget(
            '1',
            Dashboard11WidgetIdsByType.TextWidget,
            widgetExtendedModeParamsBeforeUpdate
          ),
          createCheckboxWidget('2', Dashboard11WidgetIdsByType.CheckboxWidget),
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
                  widgetExtendedModeParamsBeforeUpdate
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
                      widgetExtendedModeParamsBeforeUpdate
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

    const resultExtendedMode: CurrentDashboard.State = {
      version: 12,
      boxes: [],
      config: {
        Box0: [
          createTextWidget(
            '1',
            CurrentDashboardWidgetIdsByType.TextWidget,
            widgetExtendedModeParamsAfterUpdate
          ),
          createCheckboxWidget('2', CurrentDashboardWidgetIdsByType.CheckboxWidget),
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
                  widgetExtendedModeParamsAfterUpdate
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
                      widgetExtendedModeParamsAfterUpdate
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

    const sourceBasicMode: Dashboard11.State = {
      version: 11,
      boxes: [],
      config: {
        Box0: [
          createTextWidget('1', Dashboard11WidgetIdsByType.TextWidget, widgetBasicModeParams),
          createCheckboxWidget('2', Dashboard11WidgetIdsByType.CheckboxWidget),
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
                  widgetBasicModeParams
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
                      widgetBasicModeParams
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

    const resultBasicMode: CurrentDashboard.State = {
      version: 12,
      boxes: [],
      config: {
        Box0: [
          createTextWidget('1', CurrentDashboardWidgetIdsByType.TextWidget, widgetBasicModeParams),
          createCheckboxWidget('2', CurrentDashboardWidgetIdsByType.CheckboxWidget),
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
                  widgetBasicModeParams
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
                      widgetBasicModeParams
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

    expect(currentMigration.up(sourceBasicMode)).toEqual(resultBasicMode)

    expect(currentMigration.up(sourceExtendedMode)).toEqual(resultExtendedMode)
  })

  it('понижает версию', () => {
    const widgetExtendedModeParamsBeforeUpdate = {
      ...commonBoxItemsParams,
      ...commonTextWidgetParams,
      type: 'advanced',
      view: 'primary',
    }

    const widgetExtendedModeParamsAfterUpdate = {
      ...commonBoxItemsParams,
      ...commonTextWidgetParams,
      type: 'advanced',
    }

    const widgetBasicModeParams = {
      ...commonBoxItemsParams,
      ...commonTextWidgetParams,
      type: 'text1',
    }

    const sourceExtendedMode: CurrentDashboard.State = {
      version: 12,
      boxes: [],
      config: {
        Box0: [
          createTextWidget(
            '1',
            CurrentDashboardWidgetIdsByType.TextWidget,
            widgetExtendedModeParamsBeforeUpdate
          ),
          createCheckboxWidget('2', CurrentDashboardWidgetIdsByType.CheckboxWidget),
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
                  widgetExtendedModeParamsBeforeUpdate
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
                      widgetExtendedModeParamsBeforeUpdate
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

    const resultExtendedMode: Dashboard11.State = {
      version: 11,
      boxes: [],
      config: {
        Box0: [
          createTextWidget(
            '1',
            Dashboard11WidgetIdsByType.TextWidget,
            widgetExtendedModeParamsAfterUpdate
          ),
          createCheckboxWidget('2', Dashboard11WidgetIdsByType.CheckboxWidget),
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
                  widgetExtendedModeParamsAfterUpdate
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
                      widgetExtendedModeParamsAfterUpdate
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

    const sourceBasicMode: CurrentDashboard.State = {
      version: 12,
      boxes: [],
      config: {
        Box0: [
          createTextWidget('1', CurrentDashboardWidgetIdsByType.TextWidget, widgetBasicModeParams),
          createCheckboxWidget('2', CurrentDashboardWidgetIdsByType.CheckboxWidget),
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
                  widgetBasicModeParams
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
                      widgetBasicModeParams
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

    const resultBasicMode: Dashboard11.State = {
      version: 11,
      boxes: [],
      config: {
        Box0: [
          createTextWidget('1', Dashboard11WidgetIdsByType.TextWidget, widgetBasicModeParams),
          createCheckboxWidget('2', Dashboard11WidgetIdsByType.CheckboxWidget),
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
                  widgetBasicModeParams
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
                      widgetBasicModeParams
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
