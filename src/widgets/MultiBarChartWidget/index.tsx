import * as React from 'react'

import { BarChart } from '@/components/BarChart'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { WidgetSettingsNumber } from '@/components/WidgetSettingsNumber'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard'
import { barChartParams, MultiBarChartParams as Params } from '@/dashboard/widget-params'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.MultiBarChart
type Data = DataMap[typeof dataType]

export const defaultParams: Params = {
  orientation: 'vertical',
  hasRatio: false,
  gridTicks: 4,
  valuesTicks: 1,
  unitPosition: 'none',
}

export const MultiBarChartWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { orientation, hasRatio, gridTicks, valuesTicks, unitPosition },
}) => (
  <BarChart
    {...data}
    hasRatio={hasRatio}
    orientation={orientation}
    gridTicks={gridTicks}
    valuesTicks={valuesTicks}
    unitPosition={unitPosition}
    isMultiBar
  />
)

export const MultiBarChartWidget = createWidget<Data, Params>({
  id: widgetIdsByType.MultiBarChartWidget,
  name: 'МультиБарчарт',
  defaultParams: {
    ...defaultParams,
    growRatio: 1,
  },
  dataType: DataType.MultiBarChart,
  Content: MultiBarChartWidgetContent,
  renderSettings(params, onChangeParams) {
    return (
      <>
        <WidgetSettingsNumber
          name="Количество линий"
          value={params.gridTicks}
          onChange={value => onChangeParams({ gridTicks: value })}
        />
        <WidgetSettingsNumber
          name="Частота обновления подписей"
          value={params.valuesTicks}
          onChange={value => onChangeParams({ valuesTicks: value })}
        />
        <WidgetSettingsSelect
          name="Ориентация"
          value={params.orientation}
          onChange={value => onChangeParams({ orientation: value })}
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
          onChange={value => onChangeParams({ hasRatio: value })}
        />
        <WidgetSettingsSelect
          name="Позиция единиц измерения"
          value={params.unitPosition}
          onChange={value => onChangeParams({ unitPosition: value })}
          values={barChartParams.unitPositions.map(position => ({
            value: position,
            name: position,
          }))}
        />
      </>
    )
  },
})
