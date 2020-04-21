import {
  CurrentDashboard,
  currentMigration,
  widgetIdsByType as CurrentDashboardWidgetIdsByType,
} from '../'
import { Dashboard14, widgetIdsByType as Dashboard14WidgetIdsByType } from '../../dashboard14'
import Dashboard14GridItem = Dashboard14.GridItem

const commonBoxItemParams:
  | CurrentDashboard.CommonBoxItemParams
  | Dashboard14.CommonBoxItemParams = {
  marginTop: 'm',
  fallbackPlaceholderText: 'test',
  growRatio: 1,
}

const additiveGridParams: CurrentDashboard.GridItem['params'] = {
  verticalMargin: 'xs',
  horizontalMargin: 'xs',
}

const createGridWidget = (
  params: Dashboard14GridItem['params'] | CurrentDashboard.GridItem['params']
): CurrentDashboard.GridItem | Dashboard14.GridItem =>
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
    | typeof CurrentDashboardWidgetIdsByType.CheckboxWidget
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

describe('currentMigration', () => {
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

    const result: CurrentDashboard.State = {
      version: 15,
      boxes: [],
      config: {
        Box0: [
          createGridWidget(gridParamsAfterUpdate),
          createCheckboxWidget('1', CurrentDashboardWidgetIdsByType.CheckboxWidget),
        ],
      },
      settings: {},
    }

    expect(currentMigration.up(source)).toEqual(result)
  })

  it('понижает версию', () => {
    const gridParamsBeforeUpdate = {
      ...commonBoxItemParams,
      ...additiveGridParams,
    }
    const gridParamsAfterUpdate = {
      ...commonBoxItemParams,
    }

    const source: CurrentDashboard.State = {
      version: 15,
      boxes: [],
      config: {
        Box0: [
          createGridWidget(gridParamsBeforeUpdate),
          createCheckboxWidget('1', CurrentDashboardWidgetIdsByType.CheckboxWidget),
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

    expect(currentMigration.down(source)).toEqual(result)
  })
})
