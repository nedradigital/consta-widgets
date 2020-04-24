import { Dashboard15, migration15, widgetIdsByType as Dashboard15WidgetIdsByType } from '../'
import { Dashboard14, widgetIdsByType as Dashboard14WidgetIdsByType } from '../../dashboard14'
import Dashboard14GridItem = Dashboard14.GridItem

const commonBoxItemParams: Dashboard15.CommonBoxItemParams | Dashboard14.CommonBoxItemParams = {
  marginTop: 'm',
  fallbackPlaceholderText: 'test',
  growRatio: 1,
}

const additiveGridParams: Dashboard15.GridItem['params'] = {
  verticalMargin: 'xs',
  horizontalMargin: 'xs',
}

const createGridWidget = (
  params: Dashboard14GridItem['params'] | Dashboard15.GridItem['params']
): Dashboard15.GridItem | Dashboard14.GridItem =>
  ({
    type: 'grid',
    params,
    grid: {
      items: [
        [[], [], []],
        [[], [], []],
      ],
      columnParams: [{}, {}, {}],
      rowParams: [{}, {}, {}],
    },
  } as const)

const createCheckboxWidget = (
  name: string,
  widgetType:
    | typeof Dashboard14WidgetIdsByType.CheckboxWidget
    | typeof Dashboard15WidgetIdsByType.CheckboxWidget
) =>
  ({
    type: 'widget',
    debugName: name,
    id: name,
    widgetType,
    params: {
      size: 'm',
      content: 'Выбор',
      ...commonBoxItemParams,
    },
  } as const)

describe('migration15', () => {
  it('повышает версию', () => {
    const gridParamsBeforeUpdate = {
      ...commonBoxItemParams,
    }
    const gridParamsAfterUpdate = {
      ...commonBoxItemParams,
      ...additiveGridParams,
    }

    const source: Dashboard14.State = {
      version: 14,
      boxes: [],
      config: {
        Box0: [
          createGridWidget(gridParamsBeforeUpdate),
          createCheckboxWidget('1', Dashboard14WidgetIdsByType.CheckboxWidget),
        ],
      },
      settings: {},
    }

    const result: Dashboard15.State = {
      version: 15,
      boxes: [],
      config: {
        Box0: [
          createGridWidget(gridParamsAfterUpdate),
          createCheckboxWidget('1', Dashboard15WidgetIdsByType.CheckboxWidget),
        ],
      },
      settings: {},
    }

    expect(migration15.up(source)).toEqual(result)
  })

  it('понижает версию', () => {
    const gridParamsBeforeUpdate = {
      ...commonBoxItemParams,
      ...additiveGridParams,
    }
    const gridParamsAfterUpdate = {
      ...commonBoxItemParams,
    }

    const source: Dashboard15.State = {
      version: 15,
      boxes: [],
      config: {
        Box0: [
          createGridWidget(gridParamsBeforeUpdate),
          createCheckboxWidget('1', Dashboard15WidgetIdsByType.CheckboxWidget),
        ],
      },
      settings: {},
    }

    const result: Dashboard14.State = {
      version: 14,
      boxes: [],
      config: {
        Box0: [
          createGridWidget(gridParamsAfterUpdate),
          createCheckboxWidget('1', Dashboard14WidgetIdsByType.CheckboxWidget),
        ],
      },
      settings: {},
    }

    expect(migration15.down(source)).toEqual(result)
  })
})
