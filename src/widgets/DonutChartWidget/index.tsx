import { Colors, DonutChart } from '@/components/DonutChart'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.Donut
type Data = DataMap[typeof dataType]

const widgetId = 'c7709106-fe0d-4e7c-bfce-2e5b88aa6d50'

type Params = {
  colors: Colors
}

export const defaultParams: Params = {
  colors: {
    red: '#EB5757',
    yellow: '#F2C94C',
    blue: '#56B9F2',
  },
}

export const DonutChartWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { colors },
}) => (
  // TODO Нужно сделать растягивание виджетов с графиками по высоте внутри боксов
  // @see https://jira.csssr.io/browse/GINF-50
  <div style={{ minHeight: 200 }}>
    <DonutChart colors={colors} data={data} />
  </div>
)

export const DonutChartWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Пончик',
  defaultParams,
  dataType: DataType.Donut,
  Content: DonutChartWidgetContent,
})
