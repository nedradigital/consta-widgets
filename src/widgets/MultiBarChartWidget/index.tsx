import * as React from 'react'

import { MultiBarChart, Orientation } from '@/components/MultiBarChart'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.MultiBarChart
type Data = DataMap[typeof dataType]

type Params = {
  orientation: Orientation
  hasRatio: boolean
}

const widgetId = '653e4b44-2bac-4483-8366-ace725375a35'

export const defaultParams: Params = {
  orientation: 'vertical',
  hasRatio: false,
}

export const MultiBarChartWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { orientation, hasRatio },
}) => <MultiBarChart {...data} hasRatio={hasRatio} orientation={orientation} />

export const MultiBarChartWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'МультиБарчарт',
  defaultParams: {
    ...defaultParams,
    growRatio: 1,
  },
  dataType: DataType.MultiBarChart,
  Content: MultiBarChartWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsSelect
          name="Ориентация"
          value={params.orientation}
          onChange={value => onChangeParam('orientation', value)}
          values={[
            {
              name: 'Вертикальная',
              value: 'vertical',
            },
            {
              name: 'Горизонтальная',
              value: 'horizontal',
            },
          ]}
        />
        <WidgetSettingsCheckbox
          name="Нормализовать значения"
          value={params.hasRatio}
          onChange={value => onChangeParam('hasRatio', value)}
        />
      </>
    )
  },
})
