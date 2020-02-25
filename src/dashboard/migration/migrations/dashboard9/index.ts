import { Layout } from 'react-grid-layout'

import { WidgetItem } from '@/dashboard'

import { Migration } from '../..'
import { Dashboard8 } from '../dashboard8'

export namespace Dashboard9 {
  export type ColumnParams = {
    growRatio?: number
  }

  export type RowParams = {
    growRatio?: number
  }

  export type GridContent = {
    items: ReadonlyArray<ReadonlyArray<readonly WidgetItem[]>>
    columnParams: readonly ColumnParams[]
    rowParams: readonly RowParams[]
  }

  export type BoxItemMarginSize = '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl'

  export type CommonBoxItemParams = {
    marginTop?: BoxItemMarginSize
    growRatio?: number
    fallbackPlaceholderText?: string
  }

  export type GridItem = {
    type: 'grid'
    grid: GridContent
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

  export type BoxItem = WidgetItem | GridItem

  export type Config = { [key: string]: readonly BoxItem[] }

  export type MarginSize = 's' | 'm' | 'l' | 'xl'

  export type Settings = {
    cols?: number
    margin?: MarginSize
  }

  export type State = {
    version: 9
    boxes: readonly Layout[]
    config: Config
    settings: Settings
  }
}

export const migration9: Migration<Dashboard8.State, Dashboard9.State> = {
  versionTo: 9,
  changes: ['Виджет колонок стал виджетом сетки'],
  up: data => {
    const updateItem = (item: Dashboard8.BoxItem): Dashboard9.BoxItem => {
      if (item.type === 'columns') {
        return {
          type: 'grid',
          grid: {
            columnParams: item.columns.map(column => column.params),
            rowParams: [{}],
            items: [
              item.columns.map(column =>
                column.items.filter(
                  (columnItem): columnItem is WidgetItem => columnItem.type === 'widget'
                )
              ),
            ],
          },
          params: item.params,
        }
      } else {
        return item
      }
    }

    return {
      ...data,
      version: 9,
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
    const updateItem = (item: Dashboard9.BoxItem): Dashboard8.BoxItem => {
      if (item.type === 'grid') {
        return {
          type: 'columns',
          columns: item.grid.columnParams.map((params, columnIdx) => ({
            params,
            items: item.grid.items[0][columnIdx],
          })),
          params: item.params,
        }
      } else {
        return item
      }
    }

    return {
      ...data,
      version: 8,
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
