import { Dashboard12, migration12, widgetIdsByType as Dashboard12WidgetIdsByType } from '../'
import { Dashboard11, widgetIdsByType as Dashboard11WidgetIdsByType } from '../../dashboard11'
import CommonBoxItemParams = Dashboard12.CommonBoxItemParams

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
    | typeof Dashboard12WidgetIdsByType.TextWidget
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
    | typeof Dashboard12WidgetIdsByType.CheckboxWidget
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

describe('migration12', () => {
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

    const resultExtendedMode: Dashboard12.State = {
      version: 12,
      boxes: [],
      config: {
        Box0: [
          createTextWidget(
            '1',
            Dashboard12WidgetIdsByType.TextWidget,
            widgetExtendedModeParamsAfterUpdate
          ),
          createCheckboxWidget('2', Dashboard12WidgetIdsByType.CheckboxWidget),
        ],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [
              [
                createTextWidget(
                  '1.1',
                  Dashboard12WidgetIdsByType.TextWidget,
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
                      Dashboard12WidgetIdsByType.TextWidget,
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

    const resultBasicMode: Dashboard12.State = {
      version: 12,
      boxes: [],
      config: {
        Box0: [
          createTextWidget('1', Dashboard12WidgetIdsByType.TextWidget, widgetBasicModeParams),
          createCheckboxWidget('2', Dashboard12WidgetIdsByType.CheckboxWidget),
        ],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [
              [
                createTextWidget(
                  '1.1',
                  Dashboard12WidgetIdsByType.TextWidget,
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
                      Dashboard12WidgetIdsByType.TextWidget,
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

    expect(migration12.up(sourceBasicMode)).toEqual(resultBasicMode)

    expect(migration12.up(sourceExtendedMode)).toEqual(resultExtendedMode)
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

    const sourceExtendedMode: Dashboard12.State = {
      version: 12,
      boxes: [],
      config: {
        Box0: [
          createTextWidget(
            '1',
            Dashboard12WidgetIdsByType.TextWidget,
            widgetExtendedModeParamsBeforeUpdate
          ),
          createCheckboxWidget('2', Dashboard12WidgetIdsByType.CheckboxWidget),
        ],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [
              [
                createTextWidget(
                  '1.1',
                  Dashboard12WidgetIdsByType.TextWidget,
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
                      Dashboard12WidgetIdsByType.TextWidget,
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

    const sourceBasicMode: Dashboard12.State = {
      version: 12,
      boxes: [],
      config: {
        Box0: [
          createTextWidget('1', Dashboard12WidgetIdsByType.TextWidget, widgetBasicModeParams),
          createCheckboxWidget('2', Dashboard12WidgetIdsByType.CheckboxWidget),
        ],
        Box1: [
          {
            id: 'switchId',
            type: 'switch',
            displays: [
              [
                createTextWidget(
                  '1.1',
                  Dashboard12WidgetIdsByType.TextWidget,
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
                      Dashboard12WidgetIdsByType.TextWidget,
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

    expect(migration12.down(sourceBasicMode)).toEqual(resultBasicMode)

    expect(migration12.down(sourceExtendedMode)).toEqual(resultExtendedMode)
  })
})
