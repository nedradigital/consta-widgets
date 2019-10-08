import * as React from 'react'

import { WidgetWrapper } from '@/components/WidgetWrapper'
import { Data as DashboardData, DataMap, Dataset, DataType } from '@/dashboard/types'
import { getWidgetMockData } from '@/utils/widget-mock-data'

export type WidgetType<Data, Params> = React.FC<{
  data: DashboardData
  datasets: readonly Dataset[]
  dataKey: string
  params: Params
  isEditing: boolean
  onChangeParams: (newParams: Params) => void
  requestCloseSettings: () => void
}> & {
  // Мета-данные
  showName: string // name у React.FC уже есть
  mockData: Data
  defaultParams: Params
  id: string
}

export type WidgetContentProps<Data, Params> = {
  data: Data
  params: Params
}

export type OnChangeParam<Params> = <K extends keyof Params, V extends Params[K]>(
  key: K,
  value: V
) => void

export type WithDataset<T> = T & { datasetId?: string }

export const createWidget = <
  Data extends DataMap[keyof DataMap] | typeof undefined,
  OriginalParams extends { [key: string]: any } = {},
  Params extends WithDataset<OriginalParams> = WithDataset<OriginalParams>
>(opts: {
  id: string
  name: string
  dataType: DataType | null
  defaultParams: Params
  Content: React.ComponentType<WidgetContentProps<Data, OriginalParams>>
  renderSettings?: (params: Params, onChangeParam: OnChangeParam<Params>) => React.ReactNode
}) => {
  const { name, dataType, defaultParams, Content, renderSettings, id } = opts
  const Widget: WidgetType<Data, Params> = ({
    data,
    datasets,
    dataKey,
    params,
    isEditing,
    onChangeParams,
    requestCloseSettings,
  }) => {
    const widgetData: Data = data[dataKey] as any

    if (dataType && !widgetData) {
      return <div>Нет данных для виджета "{name}"</div>
    }

    const allowedDatasets = datasets.filter(d => d.type === dataType)
    const onChangeParam: OnChangeParam<Params> = (paramName, newValue) =>
      onChangeParams({
        ...params,
        [paramName]: newValue,
      })

    return (
      <WidgetWrapper
        datasets={allowedDatasets}
        params={params}
        onChangeParam={onChangeParam}
        showSettings={isEditing}
        additionalSettings={renderSettings ? renderSettings(params, onChangeParam) : undefined}
        requestCloseSettings={requestCloseSettings}
      >
        <Content data={widgetData} params={params} />
      </WidgetWrapper>
    )
  }

  Widget.showName = name
  Widget.defaultParams = defaultParams
  if (dataType) {
    Widget.mockData = getWidgetMockData(dataType) as Data
  }
  Widget.id = id

  return Widget
}
