import { Layout } from 'react-grid-layout'

import { Migration } from '../../'
import { Dashboard1 } from '../dashboard1'

export namespace Dashboard2 {
  export type ColumnsContent = ReadonlyArray<ReadonlyArray<BoxItem>>

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
    version: 2
    boxes: readonly Layout[]
    config: Config
    settings: Settings
  }
}

export const migration2: Migration<Dashboard1.State, Dashboard2.State> = {
  versionTo: 2,
  changes: ['Настройки стали обязательным полем'],
  up: data => ({
    ...data,
    settings: data.settings || {},
    version: 2,
  }),
  down: data => ({
    ...data,
    version: 1,
  }),
}
