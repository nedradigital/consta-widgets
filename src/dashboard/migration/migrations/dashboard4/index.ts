import { Layout } from 'react-grid-layout'

import { Migration } from '../..'
import { Dashboard3 } from '../dashboard3'

export namespace Dashboard4 {
  export type ColumnsContent = ReadonlyArray<ReadonlyArray<BoxItem>>

  export type BoxItemMarginSize = '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl'

  export type CommonBoxItemParams = {
    marginTop?: BoxItemMarginSize
    growRatio?: number
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
      datasetId?: string
      [key: string]: any
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
    version: 4
    boxes: readonly Layout[]
    config: Config
    settings: Settings
  }
}

export const migration4: Migration<Dashboard3.State, Dashboard4.State> = {
  versionTo: 4,
  changes: ['У виджетов добавилось значение 2xs для marginTop'],
  up: data => {
    return {
      ...data,
      version: 4,
    }
  },

  down: data => {
    const updateItem = (item: Dashboard4.BoxItem): Dashboard3.BoxItem => {
      if (item.type === 'columns') {
        return {
          type: 'columns',
          columns: item.columns.map(column => column.map(updateItem)),
          params: {},
        }
      } else {
        const { marginTop, ...restParams } = item.params
        return {
          ...item,
          params: {
            ...restParams,
            marginTop: marginTop === '2xs' ? 'xs' : marginTop,
          },
        }
      }
    }

    return {
      ...data,
      version: 3,
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
