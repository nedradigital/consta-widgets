import { Layout } from 'react-grid-layout'

import * as _ from 'lodash'

import { Migration } from '../'
import { Dashboard0 } from '../dashboard0'

export namespace Dashboard1 {
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
    version: 1
    boxes: readonly Layout[]
    config: Config
    settings?: Settings
  }
}

export const migration1: Migration<Dashboard0.State, Dashboard1.State> = {
  versionTo: 1,
  changes: ['Добавилась версия'],
  up: data => ({
    ...data,
    version: 1,
  }),
  down: data => _.omit(data, 'version'),
}
