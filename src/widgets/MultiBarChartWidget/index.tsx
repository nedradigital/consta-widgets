import * as React from 'react'

import { MultiBarChart, Orientation } from '@/components/MultiBarChart'
import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
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
}) => (
  <div style={{ height: 300 }}>
    <MultiBarChart {...data} hasRatio={hasRatio} orientation={orientation} />
  </div>
)

export const MultiBarChartWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'МультиБарчарт',
  defaultParams,
  dataType: DataType.MultiBarChart,
  Content: MultiBarChartWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsItem name="Ориентация">
          <select
            value={params.orientation}
            onChange={e => onChangeParam('orientation', e.target.value as Orientation)}
          >
            {['vertical', 'horizontal'].map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </WidgetSettingsItem>
        <WidgetSettingsItem name="Нормализовать значения">
          <input
            type="checkbox"
            checked={params.hasRatio}
            onChange={e => onChangeParam('hasRatio', e.target.checked)}
          />
        </WidgetSettingsItem>
      </>
    )
  },
})
