import * as React from 'react'

import { BarChart } from '@/components/BarChart'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { WidgetSettingsNumber } from '@/components/WidgetSettingsNumber'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard'
import { barChartParams, TornadoChartParams as Params } from '@/dashboard/widget-params'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.TornadoChart
type Data = DataMap[typeof dataType]

export const defaultParams: Params = {
  gridTicks: 4,
  valuesTicks: 1,
  unitPosition: 'none',
  size: 'm',
  showValues: true,
  xAxisShowPosition: 'bottom',
  yAxisShowPosition: 'left',
}

export const TornadoChartContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: {
    gridTicks,
    valuesTicks,
    unitPosition,
    size,
    showValues,
    xAxisShowPosition,
    yAxisShowPosition,
  },
}) => (
  <BarChart
    {...data}
    gridTicks={gridTicks}
    valuesTicks={valuesTicks}
    unitPosition={unitPosition}
    isMultiBar={false}
    size={size}
    isTornado
    showValues={showValues}
    xAxisShowPosition={xAxisShowPosition}
    yAxisShowPosition={yAxisShowPosition}
  />
)

export const TornadoChartWidget = createWidget<Data, Params>({
  id: widgetIdsByType.TornadoChartWidget,
  name: 'Торнадо',
  defaultParams: {
    ...defaultParams,
    growRatio: 1,
  },
  dataType: DataType.TornadoChart,
  Content: TornadoChartContent,
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
          name="Позиция единиц измерения"
          value={params.unitPosition}
          onChange={value => onChangeParams({ unitPosition: value })}
          values={barChartParams.unitPositions.map(position => ({
            value: position,
            name: position,
          }))}
        />
        <WidgetSettingsSelect
          name="Размер"
          value={params.size}
          onChange={value => onChangeParams({ size: value })}
          values={barChartParams.sizes.map(i => ({ name: i, value: i }))}
        />
        <WidgetSettingsCheckbox
          name="Показывать значения"
          value={params.showValues}
          onChange={value => onChangeParams({ showValues: value })}
        />
        <WidgetSettingsSelect
          name="Позиция главной оси"
          value={params.xAxisShowPosition}
          onChange={value => onChangeParams({ xAxisShowPosition: value })}
          values={[
            { name: 'Сверху', value: 'top' },
            { name: 'Снизу', value: 'bottom' },
            { name: 'Сверху и снизу', value: 'both' },
            { name: 'Нет', value: 'none' },
          ]}
        />
        <WidgetSettingsSelect
          name="Позиция побочной оси"
          value={params.yAxisShowPosition}
          onChange={value => onChangeParams({ yAxisShowPosition: value })}
          withEmptyValue
          values={[
            { name: 'Слева', value: 'left' },
            { name: 'Справа', value: 'right' },
            { name: 'Слева и справа', value: 'both' },
            { name: 'Нет', value: 'none' },
          ]}
        />
      </>
    )
  },
})
