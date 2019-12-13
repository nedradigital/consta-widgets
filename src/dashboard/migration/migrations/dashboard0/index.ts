import { Layout } from 'react-grid-layout'

export namespace Dashboard0 {
  export type ColumnsContent = ReadonlyArray<readonly BoxItem[]>

  export type ColumnsItem = {
    columns: ColumnsContent
    type: 'columns'
  }

  export type WidgetItem = {
    type: 'widget'
    id: string
    debugName: string
    widgetType: string
    params: {
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
    version?: 0
    boxes: readonly Layout[]
    config: Config
    settings?: Settings
  }
}
