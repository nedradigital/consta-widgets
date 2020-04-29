import { FormatterType } from '@/data-layer/components/Consumers'

export namespace DataLayer {
  // Источники

  export type SourcesList = ReadonlyArray<{
    file: string
    tables: readonly string[]
    objects: readonly string[]
  }>

  export type DataValue = string | number | null
  export type TableData = ReadonlyArray<Record<string, DataValue>>
  export type ObjectData = Record<string, DataValue>
  export type SourceData = TableData | ObjectData

  export type SourcesData = ReadonlyArray<{
    file: string
    tables: Record<string, TableData>
    objects: Record<string, ObjectData>
  }>

  // Конфиг

  export type SourceItem<T extends 'table' | 'object' = 'table' | 'object'> = {
    type: T
    file: string
    name: string
    id: string
  }

  export type LinearWidgetItem = {
    widgetType: 'LinearChart'
    inputs: {
      table?: string
    }
    config: {
      x?: string // todo разобраться с необязательностью полей. x - обязательное поле, но при добавлении пустого виджета мы не можем заполнить его по дефолту. для сравнения formatX — необязательно поле
      formatX?: FormatterType
      y: ReadonlyArray<{ field: string; name: string; color: string }>
      formatY?: FormatterType
    }
  }

  export type WidgetItem = {
    type: 'widget'
    widgetId: string
  } & LinearWidgetItem

  export type ConfigItem = SourceItem | WidgetItem

  export type Config = readonly ConfigItem[]
}
