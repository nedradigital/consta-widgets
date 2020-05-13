import { BarChart } from '@/components/BarChart'
import { transformBarChartGroupsToCommonGroups } from '@/components/BarChart/helpers'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { WidgetSettingsNumber } from '@/components/WidgetSettingsNumber'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard'
import { barChartParams, BarChartParams as Params } from '@/dashboard/widget-params'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.BarChart
type Data = DataMap[typeof dataType]

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
    groups={transformBarChartGroupsToCommonGroups(data.groups)}
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
  id: widgetIdsByType.BarChartWidget,
  name: 'Барчарт',
  defaultParams: {
    ...defaultParams,
    growRatio: 1,
  },
  dataType: DataType.BarChart,
  Content: BarChartWidgetContent,
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
          name="Размер"
          value={params.size}
          onChange={value => onChangeParams({ size: value })}
          values={barChartParams.sizes.map(i => ({ name: i, value: i }))}
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
        {params.orientation === 'horizontal' ? (
          <WidgetSettingsCheckbox
            name="Показывать значения"
            value={params.showValues}
            onChange={value => onChangeParams({ showValues: value })}
          />
        ) : null}
        <WidgetSettingsSelect
          name="Позиция единиц измерения"
          value={params.unitPosition}
          values={barChartParams.unitPositions.map(position => ({
            value: position,
            name: position,
          }))}
          onChange={value => onChangeParams({ unitPosition: value })}
        />
      </>
    )
  },
})
