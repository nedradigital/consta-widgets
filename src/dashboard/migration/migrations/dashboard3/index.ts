import { Layout } from 'react-grid-layout'

import { Migration } from '../../'
import { Dashboard2 } from '../dashboard2'

export namespace Dashboard3 {
  export type ColumnsContent = ReadonlyArray<readonly BoxItem[]>

  export type BoxItemMarginSize = 'xs' | 's' | 'm' | 'l' | 'xl'

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
    version: 3
    boxes: readonly Layout[]
    config: Config
    settings: Settings
  }
}

export const migration3: Migration<Dashboard2.State, Dashboard3.State> = {
  versionTo: 3,
  changes: [
    'У колонок появились настройки',
    'Параметр высоты заменён параметром растягивания',
    'Пропала настройка отступа справа у виджета',
  ],
  up: data => {
    const updateItem = (item: Dashboard2.BoxItem): Dashboard3.BoxItem => {
      if (item.type === 'columns') {
        return {
          type: 'columns',
          columns: item.columns.map(column => column.map(updateItem)),
          params: {},
        }
      } else {
        const { height, marginRight, ...restParams } = item.params
        return {
          ...item,
          params: {
            ...restParams,
            growRatio: height,
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

  down: data => {
    const updateItem = (item: Dashboard3.BoxItem): Dashboard2.BoxItem => {
      if (item.type === 'columns') {
        return {
          type: 'columns',
          columns: item.columns.map(column => column.map(updateItem)),
        }
      } else {
        const { growRatio, ...restParams } = item.params
        return {
          ...item,
          params: {
            ...restParams,
            height: growRatio,
          },
        }
      }
    }

    return {
      ...data,
      version: 2,
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
