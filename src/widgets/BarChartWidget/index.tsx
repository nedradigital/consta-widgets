import { BarChart, Colors, Orientation } from '@/components/BarChart'
import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.BarChart
type Data = DataMap[typeof dataType]

type Params = {
  orientation: Orientation
  showValues: boolean
  colors: Colors
}

export const defaultParams: Params = {
  orientation: 'vertical',
  showValues: false,
  colors: {
    blue: '#56B9F2',
    red: '#EB5757',
    orange: '#FCA355',
  },
}

export const BarChartWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  params: { orientation, colors, showValues },
  data,
}) => (
  // TODO Нужно сделать растягивание виджетов с графиками по высоте внутри боксов
  // @see https://jira.csssr.io/browse/GINF-50
  <div style={{ height: 300 }}>
    <BarChart data={data} showValues={showValues} colors={colors} orientation={orientation} />
  </div>
)

export const BarChartWidget = createWidget<Data, Params>({
  name: 'Барчарт',
  defaultParams,
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
