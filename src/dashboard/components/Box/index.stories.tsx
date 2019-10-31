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
  defaultParams as cardValueWithBadgeDefaultParams,
  widgetId as cardValueWidgetId,
} from '@/widgets/CardValueWithBadge'
import {
  defaultParams as cardWithBadgeDefaultParams,
  widgetId as cardWidgetId,
} from '@/widgets/CardWithBadge'
import { defaultParams as textDefaultParams, widgetId as textWidgetId } from '@/widgets/TextWidget'

import { Box } from '.'

const cardValueWithBadgeKey = getUniqueName('CardValueWithBadge')
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
    debugName: 'CardValueWithBadge',
    id: cardValueWithBadgeKey,
    widgetType: cardValueWidgetId,
    params: cardValueWithBadgeDefaultParams,
  },
  {
    type: 'columns',
    columns: [
      [
        {
          type: 'widget',
          debugName: 'CardWithBadge',
          id: getUniqueName('CardWithBadge'),
          widgetType: cardWidgetId,
          params: cardWithBadgeDefaultParams,
        },
      ],
      [
        {
          type: 'widget',
          debugName: 'CardWithBadge',
          id: getUniqueName('CardWithBadge'),
          widgetType: cardWidgetId,
          params: cardWithBadgeDefaultParams,
        },
      ],
      [
        {
          type: 'widget',
          debugName: 'CardWithBadge',
          id: getUniqueName('CardWithBadge'),
          widgetType: cardWidgetId,
          params: cardWithBadgeDefaultParams,
        },
      ],
    ],
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
              [cardValueWithBadgeKey]: {
                value: 999,
                percentage: -99,
                status: 'warning',
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
