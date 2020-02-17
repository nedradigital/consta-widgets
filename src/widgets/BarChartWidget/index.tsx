import { BarChart, Orientation, Size, sizes } from '@/components/BarChart'
import { UnitPosition, unitPositions } from '@/components/BarChartAxis'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { WidgetSettingsNumber } from '@/components/WidgetSettingsNumber'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.BarChart
type Data = DataMap[typeof dataType]

type Params = {
  orientation: Orientation
  size: Size
  showValues: boolean
  gridTicks: number
  valuesTicks: number
  unitPosition: UnitPosition
}

export const widgetId = '1a8a7577-36e3-4fe6-a23e-244a51cd37c8'

export const defaultParams: Params = {
  orientation: 'vertical',
  size: 'm',
  gridTicks: 4,
  valuesTicks: 1,
  showValues: false,
  unitPosition: 'none',
}

export const BarChartWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  params: { orientation, showValues, valuesTicks, gridTicks, unitPosition, size },
  data,
}) => (
  <BarChart
    {...data}
    showValues={showValues}
    gridTicks={gridTicks}
    valuesTicks={valuesTicks}
    orientation={orientation}
    unitPosition={unitPosition}
    size={size}
    isMultiBar={false}
  />
)

export const BarChartWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Барчарт',
  defaultParams: {
    ...defaultParams,
    growRatio: 1,
  },
  dataType: DataType.BarChart,
  Content: BarChartWidgetContent,
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
          name="Размер"
          value={params.size}
          onChange={value => onChangeParam('size', value)}
          values={sizes.map(i => ({ name: i, value: i }))}
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
        {params.orientation === 'horizontal' ? (
          <WidgetSettingsCheckbox
            name="Показывать значения"
            value={params.showValues}
            onChange={value => onChangeParam('showValues', value)}
          />
        ) : null}
        <WidgetSettingsSelect
          name="Позиция единиц измерения"
          value={params.unitPosition}
          values={unitPositions.map(position => ({ value: position, name: position }))}
          onChange={value => onChangeParam('unitPosition', value)}
        />
      </>
    )
  },
})
