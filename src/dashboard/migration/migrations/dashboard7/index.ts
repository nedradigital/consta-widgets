import { Layout } from 'react-grid-layout'

import { Migration } from '../..'
import { Dashboard6 } from '../dashboard6'

export namespace Dashboard7 {
  export type ColumnParams = {
    growRatio?: number
  }

  export type ColumnContent = {
    params: ColumnParams
    items: readonly BoxItem[]
  }

  export type ColumnsContent = readonly ColumnContent[]

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
    version: 7
    boxes: readonly Layout[]
    config: Config
    settings: Settings
  }
}

export const migration7: Migration<Dashboard6.State, Dashboard7.State> = {
  versionTo: 7,
  changes: ['Каждой колонке добавлен блок параметров для конфигурации'],
  up: data => {
    const updateItem = (item: Dashboard6.BoxItem): Dashboard7.BoxItem => {
      if (item.type === 'columns') {
        return {
          ...item,
          columns: item.columns.map(column => ({
            params: {},
            items: column.map(updateItem),
          })),
        }
      }

      return item
    }

    return {
      ...data,
      version: 7,
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
    const updateItem = (item: Dashboard7.BoxItem): Dashboard6.BoxItem => {
      if (item.type === 'columns') {
        return {
          type: 'columns',
          columns: item.columns.map(column => column.items.map(updateItem)),
          params: {},
        }
      } else {
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
}
