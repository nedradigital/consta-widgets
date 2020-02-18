import { Layout } from 'react-grid-layout'

import { TextWidget } from '@/widgets/TextWidget'

import { Migration } from '../..'
import { Dashboard7 } from '../dashboard7'

export namespace Dashboard8 {
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
    version: 8
    boxes: readonly Layout[]
    config: Config
    settings: Settings
  }
}

export const migration8: Migration<Dashboard7.State, Dashboard8.State> = {
  versionTo: 8,
  changes: ['В TextWidget появился пропс наличия градиента croppedWithGradient'],
  up: data => {
    const updateItem = (item: Dashboard7.BoxItem): Dashboard8.BoxItem => {
      if (item.type === 'columns') {
        return {
          ...item,
          columns: item.columns.map(column => ({
            params: { ...column.params },
            items: column.items.map(updateItem),
          })),
        }
      } else {
        if (item.widgetType === TextWidget.id) {
          const { croppedLineCount, ...restParams } = item.params

          return {
            ...item,
            params: {
              ...restParams,
              croppedLineCount,
              croppedWithGradient: Boolean(croppedLineCount),
            },
          }
        }

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

  down: data => {
    const updateItem = (item: Dashboard8.BoxItem): Dashboard7.BoxItem => {
      if (item.type === 'columns') {
        return {
          ...item,
          columns: item.columns.map(column => ({
            params: { ...column.params },
            items: column.items.map(updateItem),
          })),
        }
      } else {
        if (item.widgetType === TextWidget.id) {
          const { croppedWithGradient, ...restParams } = item.params

          return {
            ...item,
            params: {
              ...restParams,
            },
          }
        }

        return item
      }
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
}
