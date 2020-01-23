import { BarChart, Orientation, Size, sizes } from '@/components/BarChart'
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
  showUnitLeft: boolean
  showUnitBottom: boolean
}

const widgetId = '1a8a7577-36e3-4fe6-a23e-244a51cd37c8'

export const defaultParams: Params = {
  orientation: 'vertical',
  size: 'm',
  gridTicks: 4,
  valuesTicks: 4,
  showValues: false,
  showUnitLeft: false,
  showUnitBottom: false,
}

export const BarChartWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  params: { orientation, showValues, valuesTicks, gridTicks, showUnitLeft, showUnitBottom, size },
  data,
}) => (
  <BarChart
    {...data}
    showValues={showValues}
    gridTicks={gridTicks}
    valuesTicks={valuesTicks}
    showUnitLeft={showUnitLeft}
    showUnitBottom={showUnitBottom}
    orientation={orientation}
    size={size}
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
          name="Количество подписей"
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
        <b>Единицы измерения</b>
        <WidgetSettingsCheckbox
          name="Показывать слева"
          value={params.showUnitLeft}
          onChange={value => onChangeParam('showUnitLeft', value)}
        />
        <WidgetSettingsCheckbox
          name="Показывать снизу"
          value={params.showUnitBottom}
          onChange={value => onChangeParam('showUnitBottom', value)}
        />
      </>
    )
  },
})
