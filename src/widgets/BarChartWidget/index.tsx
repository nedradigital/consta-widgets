import { BarChart, Orientation } from '@/components/BarChart'
import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
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
        {params.orientation === 'horizontal' ? (
          <WidgetSettingsItem name="Показывать значения">
            <input
              type="checkbox"
              checked={params.showValues}
              onChange={e => onChangeParam('showValues', e.target.checked)}
            />
          </WidgetSettingsItem>
        ) : null}
      </>
    )
  },
})
