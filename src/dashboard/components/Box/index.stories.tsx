import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { boolean, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { BoxItem } from '@/dashboard'
import { exampleDatasets } from '@/dashboard/mockData'
import { getUniqueName } from '@/utils/uniq-name-hook'
import { widgetIdsByType } from '@/utils/widgets-list'
import { blockCenteringDecorator } from '@/utils/Storybook'
import { defaultParams as statsWidgetDefaultParams } from '@/widgets/StatsWidget'
import { defaultParams as textDefaultParams } from '@/widgets/TextWidget'

import { Box } from '.'

const statsWidgetKey = getUniqueName('StatsWidget')
const initialItems: readonly BoxItem[] = [
  {
    type: 'widget',
    debugName: 'TitleWidget',
    id: getUniqueName('TitleWidget'),
    widgetType: widgetIdsByType.TextWidget,
    params: textDefaultParams,
  },
  {
    type: 'widget',
    debugName: 'StatsWidget',
    id: statsWidgetKey,
    widgetType: widgetIdsByType.StatsWidget,
    params: statsWidgetDefaultParams,
  },
]

const BoxStory = () => {
  const [items, changeItems] = React.useState(initialItems)

  const handler = (newItems: readonly BoxItem[]) => {
    changeItems(newItems)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ position: 'relative' }}>
        <Box
          viewMode={boolean('viewMode', false)}
          items={items}
          onChange={handler}
          data={{
            [statsWidgetKey]: {
              value: 999,
              title: 'Сроки',
              badge: {
                percentage: -99,
                status: 'warning',
              },
              unit: 'суток',
            },
          }}
          datasets={exampleDatasets}
          parentName={select('parentName', ['switch', 'grid'], undefined)}
        />
      </div>
    </DndProvider>
  )
}

storiesOf('dashboard/Box', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: 600 }))
  .add('interactive', () => <BoxStory />)
