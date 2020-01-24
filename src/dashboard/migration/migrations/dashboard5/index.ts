import { Layout } from 'react-grid-layout'

import { Migration } from '../..'
import { Dashboard4 } from '../dashboard4'

export namespace Dashboard5 {
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
    version: 5
    boxes: readonly Layout[]
    config: Config
    settings: Settings
  }
}

export const migration5: Migration<Dashboard4.State, Dashboard5.State> = {
  versionTo: 5,
  changes: ['Добавилась возможность указывать замещающий текст если нет данных для виджета'],
  up: data => {
    return {
      ...data,
      version: 5,
    }
  },

  down: data => {
    const updateItem = (item: Dashboard5.BoxItem): Dashboard4.BoxItem => {
      if (item.type === 'columns') {
        return {
          type: 'columns',
          columns: item.columns.map(column => column.map(updateItem)),
          params: {},
        }
      } else {
        const { fallbackPlaceholderText, ...restParams } = item.params
        return {
          ...item,
          params: {
            ...restParams,
          },
        }
      }
    }

    return {
      ...data,
      version: 4,
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
