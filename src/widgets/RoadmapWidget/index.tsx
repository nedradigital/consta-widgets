import { Legend } from '@/components/Legend'
import { Roadmap } from '@/components/Roadmap'
import { DataMap, DataType } from '@/dashboard/types'
import { Text } from '@/ui/Text'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

import css from './index.css'

const dataType = DataType.Roadmap
type Data = DataMap[typeof dataType]

export const widgetId = '3e85c9b1-2507-4dd0-955c-469a3f1919b5'

type Params = {}

export const defaultParams = {}

export const RoadmapWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({ data }) => (
  <>
    {data.map((item, index) => (
      <div className={css.content} key={index}>
        {item.title ? (
          <Text size="xl" bold>
            {item.title}
          </Text>
        ) : null}
        <div className={css.table}>
          <Roadmap
            data={item.data.values}
            titles={item.data.titles}
            currentDay={item.data.currentDay}
            colorGroups={item.colorGroups}
            startDate={item.data.startDate}
            endDate={item.data.endDate}
          />
        </div>
        {item.legend ? (
          <Legend
            fontSize="s"
            labelType="dot"
            labelPosition="left"
            direction="row"
            colorGroups={item.colorGroups}
            data={item.legend}
          />
        ) : null}
      </div>
    ))}
  </>
)

export const RoadmapWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Роадмап',
  defaultParams,
  dataType,
  Content: RoadmapWidgetContent,
})
