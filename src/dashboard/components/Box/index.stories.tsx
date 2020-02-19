import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { exampleDatasets } from '@/dashboard/index.stories'
import { BoxItem } from '@/dashboard/types'
import { getUniqueName } from '@/utils/uniq-name-hook'
import { blockCenteringDecorator } from '@/utils/Storybook'
import {
  defaultParams as statsWidgetDefaultParams,
  widgetId as statsWidgetId,
} from '@/widgets/StatsWidget'
import { defaultParams as textDefaultParams, widgetId as textWidgetId } from '@/widgets/TextWidget'

import { Box } from '.'

const statsWidgetKey = getUniqueName('StatsWidget')
const initialItems: readonly BoxItem[] = [
  {
    type: 'widget',
    debugName: 'TitleWidget',
    id: getUniqueName('TitleWidget'),
    widgetType: textWidgetId,
    params: textDefaultParams,
  },
  {
    type: 'widget',
    debugName: 'StatsWidget',
    id: statsWidgetKey,
    widgetType: statsWidgetId,
    params: statsWidgetDefaultParams,
  },
]

storiesOf('dashboard/Box', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: 600 }))
  .add('interactive', () => {
    const Wrapper = () => {
      const [items, changeItems] = React.useState(initialItems)

      const handler = (newItems: readonly BoxItem[]) => {
        changeItems(newItems)
      }

      return (
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
            isNestedBox={boolean('isNestedBox', false)}
          />
        </div>
      )
    }

    return (
      <DndProvider backend={HTML5Backend}>
        <Wrapper />
      </DndProvider>
    )
  })
