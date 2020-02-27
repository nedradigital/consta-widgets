import { Layout } from 'react-grid-layout'

import { isDefined } from '@csssr/gpn-utils/lib/type-guards'

import { isWidget } from '@/utils/type-guards'

import { Migration } from '../..'
import { Dashboard9 } from '../dashboard9'

export namespace CurrentDashboard {
  export type VerticalAlignment = 'top' | 'middle' | 'bottom'

  export type ColumnParams = {
    growRatio?: number
    verticalAlignment?: VerticalAlignment
  }

  export type RowParams = {
    growRatio?: number
  }

  export type GridContent = {
    items: ReadonlyArray<ReadonlyArray<ReadonlyArray<WidgetItem | SwitchItem>>>
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

  export type SwitchContent = ReadonlyArray<readonly WidgetItem[]>

  export type SwitchItem = {
    type: 'switch'
    id: string
    displays: SwitchContent
    params: CommonBoxItemParams & {
      datasetId?: string
    }
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

  export type BoxItem = WidgetItem | GridItem | SwitchItem

  export type Config = { [key: string]: readonly BoxItem[] }

  export type MarginSize = 's' | 'm' | 'l' | 'xl'

  export type Settings = {
    cols?: number
    margin?: MarginSize
  }

  export type State = {
    version: 10
    boxes: readonly Layout[]
    config: Config
    settings: Settings
  }
}

export const currentMigration: Migration<Dashboard9.State, CurrentDashboard.State> = {
  versionTo: 10,
  changes: ['Добавился виджет "Переключатель"'],
  // MIGRATION_GENERATION:METHOD:START
  up: data => {
    return {
      ...data,
      version: 10,
    }
  },
  // MIGRATION_GENERATION:METHOD:END

  // MIGRATION_GENERATION:METHOD:START
  down: data => {
    const updateItem = (item: CurrentDashboard.BoxItem): Dashboard9.BoxItem => {
      if (item.type === 'switch') {
        return item.displays[0][0]
      }

      if (item.type === 'grid') {
        return {
          ...item,
          grid: {
            ...item.grid,
            items: item.grid.items.map(row =>
              row.map(column => column.map(updateItem).filter(isWidget))
            ),
          },
        }
      }

      return item
    }

    return {
      ...data,
      version: 9,
      config: Object.keys(data.config).reduce((newConfig, key) => {
        const items = data.config[key]

        return {
          ...newConfig,
          [key]: items.map(updateItem).filter(isDefined),
        }
      }, {}),
    }
  },
  // MIGRATION_GENERATION:METHOD:END
}
