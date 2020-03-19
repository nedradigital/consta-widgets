import * as React from 'react'

import { BarChart, Orientation } from '@/components/BarChart'
import { UnitPosition, unitPositions } from '@/components/BarChartAxis'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { WidgetSettingsNumber } from '@/components/WidgetSettingsNumber'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard/types'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.MultiBarChart
type Data = DataMap[typeof dataType]

type Params = {
  orientation: Orientation
  hasRatio: boolean
  gridTicks: number
  valuesTicks: number
  unitPosition: UnitPosition
}

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
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsNumber
          name="Количество линий"
          value={params.gridTicks}
          onChange={value => onChangeParam('gridTicks', value)}
        />
        <WidgetSettingsNumber
          name="Частота обновления подписей"
          value={params.valuesTicks}
          onChange={value => onChangeParam('valuesTicks', value)}
        />
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
        <WidgetSettingsSelect
          name="Позиция единиц измерения"
          value={params.unitPosition}
          onChange={value => onChangeParam('unitPosition', value)}
          values={unitPositions.map(position => ({ value: position, name: position }))}
        />
      </>
    )
  },
})
