import * as React from 'react'

import {
  CommonBoxItemParams,
  Data as DashboardData,
  DataMap,
  Dataset,
  DataType,
} from '@/dashboard/types'
import { dataColorsValidator, widgetDataIsEmpty } from '@/utils/validators'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { WidgetId } from '@/utils/widgets-list'

export type WidgetType<Data, Params> = React.FC<{
  data: DashboardData
  datasets: readonly Dataset[]
  dataKey: string
  params: Params
}> & {
  // Мета-данные
  showName: string // name у React.FC уже есть
  mockData: Data
  defaultParams: Params
  id: WidgetId
  dataType: DataType | null
  getSettings: (params: Params, onChangeParam: OnChangeParam<Params>) => React.ReactNode
}

export type WidgetContentProps<Data, Params> = {
  data: Data
  params: Params
  dataset?: Dataset
}

export type OnChangeParam<Params> = <K extends keyof Params, V extends Params[K]>(
  key: K,
  value: V
) => void

export const createWidget = <
  Data extends DataMap[keyof DataMap] | typeof undefined,
  Params extends { [key: string]: any } = {}
>(opts: {
  id: WidgetId
  name: string
  dataType: DataType | null
  defaultParams: CommonBoxItemParams & Params
  Content: React.ComponentType<WidgetContentProps<Data, Params>>
  renderSettings?: (params: Params, onChangeParam: OnChangeParam<Params>) => React.ReactNode
  allowEmptyData?: boolean
}) => {
  const { name, dataType, defaultParams, Content, renderSettings, id, allowEmptyData } = opts
  const Widget: WidgetType<Data, Params> = ({ data, datasets, dataKey, params }) => {
    const widgetData: Data = data[dataKey] as any

    if (!allowEmptyData && dataType && widgetDataIsEmpty(dataType, widgetData)) {
      return <div>{params.fallbackPlaceholderText || `Нет данных для виджета "${name}"`}</div>
    }

    const dataset = params.datasetId ? datasets.find(d => d.id === params.datasetId) : undefined

    if (dataType) {
      const errors = dataColorsValidator(dataType, widgetData)

      if (errors.length) {
        // eslint-disable-next-line no-console
        console.error(
          `Проверьте данные в датасете: ${
            dataset ? dataset.name : '[неизвестный датасет]'
          }. Имя групп(ы) не найдено в описании colorGroups: ${errors.join(',')}`
        )
      }
    }

    return <Content dataset={dataset} data={widgetData} params={params} />
  }

  Widget.showName = name
  Widget.defaultParams = defaultParams
  if (dataType) {
    Widget.mockData = getWidgetMockData(dataType) as Data
  }
  Widget.id = id
  Widget.dataType = dataType
  Widget.getSettings = (params, onChangeParam) =>
    renderSettings ? renderSettings(params, onChangeParam) : undefined

  return Widget
}
