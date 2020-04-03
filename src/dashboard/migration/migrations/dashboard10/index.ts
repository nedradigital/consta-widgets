import { Layout } from 'react-grid-layout'

import { isDefined } from '@csssr/gpn-utils/lib/type-guards'

import { Migration } from '../..'
import { Dashboard9 } from '../dashboard9'

export const widgetIdsByType = {
  BarChartWidget: '1a8a7577-36e3-4fe6-a23e-244a51cd37c8',
  ButtonWidget: '950e2e88-06e7-4429-86be-0a26dc93944e',
  CheckboxWidget: '07645756-85d1-43da-b66c-10f96e5aff0b',
  ChoiceGroupWidget: '430768bb-be37-42b0-a1e7-57c6c1bebcea',
  DatePickerWidget: 'f62a900b-99a2-4194-a277-eb58c49d68ff',
  DonutChartWidget: 'c7709106-fe0d-4e7c-bfce-2e5b88aa6d50',
  ImagesWidget: 'd1a60ed1-96de-49b2-badd-052e0408d55a',
  ImageWidget: '4cbc790b-7124-402f-8c7f-ec48b3403f74',
  LegendWidget: '2538ed91-7c6d-403e-9c3e-d68d3ecd8d00',
  LinearChartWidget: 'e63c468b-75bd-4c5c-95c7-696e598db6e3',
  MapWidget: '6d34ccb1-bfc6-4898-a520-7e3c8194a378',
  MultiBarChartWidget: '653e4b44-2bac-4483-8366-ace725375a35',
  ProgressBarWidget: '944a8e67-5604-444f-afe0-f4a3263b734a',
  PyramidChartWidget: '7adf7782-03cd-4452-bfc7-20f1c02d8eac',
  RadarChartWidget: '94456b61-fba4-4121-a29c-a313cac4f4c0',
  RoadmapWidget: '3e85c9b1-2507-4dd0-955c-469a3f1919b5',
  StatsWidget: '506fa3ba-e016-4b94-9ad3-547f7e70c464',
  TableLegendWidget: '2f8f8f8e-21eb-4751-ab81-56ea11ac6342',
  TextWidget: 'b69b03e4-7fb6-4ac2-bdfa-e6c7fecdcca5',
  TrafficLightWidget: 'fbeb7619-ae6b-4742-ae62-deea18e1382d',
} as const

const widgetIds = Object.values(widgetIdsByType)

export namespace Dashboard10 {
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
    widgetType: typeof widgetIds[number]
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

const isWidget = (item: Dashboard10.BoxItem): item is Dashboard10.WidgetItem =>
  item.type === 'widget'

export const migration10: Migration<Dashboard9.State, Dashboard10.State> = {
  versionTo: 10,
  changes: ['Добавился виджет "Переключатель"'],
  up: data => {
    return {
      ...data,
      version: 10,
    }
  },

  down: data => {
    const updateItem = (item: Dashboard10.BoxItem): Dashboard9.BoxItem => {
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
}
