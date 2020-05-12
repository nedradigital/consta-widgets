import { Layout } from 'react-grid-layout'

import { Migration } from '../'
import { Dashboard5 } from '../dashboard5'

export const LinearChartWidgetId = 'e63c468b-75bd-4c5c-95c7-696e598db6e3'

export namespace Dashboard6 {
  export type ColumnsContent = ReadonlyArray<readonly BoxItem[]>

  export type BoxItemMarginSize = '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl'

  export type CommonBoxItemParams = {
    marginTop?: BoxItemMarginSize
    growRatio?: number
    fallbackPlaceholderText?: string
  }

  export type ColumnsItem = {
    columns: ColumnsContent
    type: 'columns'
    params: CommonBoxItemParams
  }

  export type WidgetItem = {
    type: 'widget'
    id: string
    debugName: string
    widgetType: string
    params: CommonBoxItemParams & {
      [key: string]: any
      datasetId?: string
    }
  }

  export type BoxItem = WidgetItem | ColumnsItem

  export type Config = { [key: string]: readonly BoxItem[] }

  export type MarginSize = 's' | 'm' | 'l' | 'xl'

  export type Settings = {
    cols?: number
    margin?: MarginSize
  }

  export type State = {
    version: 6
    boxes: readonly Layout[]
    config: Config
    settings: Settings
  }
}

export const migration6: Migration<Dashboard5.State, Dashboard6.State> = {
  versionTo: 6,
  changes: ['У линейного виджета изменился пропс isVertical на isHorizontal'],
  up: data => {
    const updateItem = (item: Dashboard5.BoxItem): Dashboard6.BoxItem => {
      if (item.type === 'columns') {
        return {
          ...item,
          columns: item.columns.map(column => column.map(updateItem)),
        }
      } else {
        if (item.widgetType === LinearChartWidgetId) {
          const { isVertical, ...restParams } = item.params
          return {
            ...item,
            params: {
              ...restParams,
              isHorizontal: !isVertical,
            },
          }
        }

        return item
      }
    }

    return {
      ...data,
      version: 6,
      config: Object.keys(data.config).reduce((newConfig, key) => {
        const items = data.config[key]

        return {
          ...newConfig,
          [key]: items.map(updateItem),
        }
      }, {}),
    }
  },

  down: data => {
    const updateItem = (item: Dashboard6.BoxItem): Dashboard5.BoxItem => {
      if (item.type === 'columns') {
        return {
          ...item,
          columns: item.columns.map(column => column.map(updateItem)),
        }
      } else {
        if (item.widgetType === LinearChartWidgetId) {
          const { isHorizontal, ...restParams } = item.params
          return {
            ...item,
            params: {
              ...restParams,
              isVertical: !isHorizontal,
            },
          }
        }

        return item
      }
    }

    return {
      ...data,
      version: 5,
      config: Object.keys(data.config).reduce((newConfig, key) => {
        const items = data.config[key]

        return {
          ...newConfig,
          [key]: items.map(updateItem),
        }
      }, {}),
    }
  },
}
