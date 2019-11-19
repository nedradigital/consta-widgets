import { Roadmap } from '@/components/Roadmap'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.Roadmap
type Data = DataMap[typeof dataType]

export const widgetId = '3e85c9b1-2507-4dd0-955c-469a3f1919b5'

type Params = {}

export const defaultParams = {}

export const RoadmapWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({ data }) => (
  <Roadmap {...data} />
)

export const RoadmapWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Роадмап',
  defaultParams,
  dataType,
  Content: RoadmapWidgetContent,
})
