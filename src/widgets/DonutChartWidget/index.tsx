import { DonutChart } from '@/components/DonutChart'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.Donut
type Data = DataMap[typeof dataType]

export const widgetId = 'c7709106-fe0d-4e7c-bfce-2e5b88aa6d50'

type Params = {}

export const defaultParams: Params = {}

export const DonutChartWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({ data }) => (
  <DonutChart {...data} />
)

export const DonutChartWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Пончик',
  defaultParams: {
    ...defaultParams,
    growRatio: 1,
  },
  dataType: DataType.Donut,
  Content: DonutChartWidgetContent,
})
