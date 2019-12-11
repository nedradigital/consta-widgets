import { BarChart, Orientation } from '@/components/BarChart'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.BarChart
type Data = DataMap[typeof dataType]

type Params = {
  orientation: Orientation
  showValues: boolean
}

const widgetId = '1a8a7577-36e3-4fe6-a23e-244a51cd37c8'

export const defaultParams: Params = {
  orientation: 'vertical',
  showValues: false,
}

export const BarChartWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  params: { orientation, showValues },
  data,
}) => <BarChart {...data} showValues={showValues} orientation={orientation} />

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
      </>
    )
  },
})
