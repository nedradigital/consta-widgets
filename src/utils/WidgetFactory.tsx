import * as React from 'react'

import { WidgetWrapper } from '@/components/WidgetWrapper'
import { Data as DashboardData, DataMap, Dataset, DataType } from '@/dashboard/types'
import { dataColorsValidator } from '@/utils/validators'
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
  dataset?: Dataset
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
  defaultHeight?: number
  Content: React.ComponentType<WidgetContentProps<Data, OriginalParams>>
  renderSettings?: (params: Params, onChangeParam: OnChangeParam<Params>) => React.ReactNode
  allowEmptyData?: boolean
}) => {
  const {
    name,
    dataType,
    defaultParams,
    defaultHeight,
    Content,
    renderSettings,
    id,
    allowEmptyData,
  } = opts
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

    if (!allowEmptyData && dataType && !widgetData) {
      return <div>Нет данных для виджета "{name}"</div>
    }

    const allowedDatasets = datasets.filter(d => d.type === dataType)
    const onChangeParam: OnChangeParam<Params> = (paramName, newValue) =>
      onChangeParams({
        ...params,
        [paramName]: newValue,
      })
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

    return (
      <WidgetWrapper
        datasets={allowedDatasets}
        params={params}
        onChangeParam={onChangeParam}
        showSettings={isEditing}
        additionalSettings={renderSettings ? renderSettings(params, onChangeParam) : undefined}
        requestCloseSettings={requestCloseSettings}
      >
        <Content dataset={dataset} data={widgetData} params={params} />
      </WidgetWrapper>
    )
  }

  Widget.showName = name
  Widget.defaultParams = { ...defaultParams, height: defaultHeight }
  if (dataType) {
    Widget.mockData = getWidgetMockData(dataType) as Data
  }
  Widget.id = id

  return Widget
}
