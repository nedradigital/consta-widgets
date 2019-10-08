import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { exampleDatasets } from '@/dashboard/index.stories'
import { getUniqueName } from '@/utils/uniq-name-hook'
import { blockCenteringDecorator } from '@/utils/Storybook'
import { widgetId as cardValueWidgetId } from '@/widgets/CardValueWithBadge'
import { widgetId as cardWidgetId } from '@/widgets/CardWithBadge'
import { widgetId as titleWidgetId } from '@/widgets/TitleWidget'

import { Box, BoxItem } from '.'

const cardValueWithBadgeKey = getUniqueName('CardValueWithBadge')
const initialItems: readonly BoxItem[] = [
  {
    type: 'widget',
    name: 'TitleWidget',
    key: getUniqueName('TitleWidget'),
    id: titleWidgetId,
    params: {
      title: 'Test title widget',
    },
  },
  {
    type: 'widget',
    name: 'CardValueWithBadge',
    key: cardValueWithBadgeKey,
    id: cardValueWidgetId,
    params: {
      title: 'Стоимость',
      label: 'млн,₽',
    },
  },
  {
    type: 'columns',
    columns: [
      [
        {
          type: 'widget',
          name: 'CardWithBadge',
          key: getUniqueName('CardWithBadge'),
          id: cardWidgetId,
          params: {
            text: 'Карточка с текстом',
            label: 'и бэйджем',
          },
        },
      ],
      [
        {
          type: 'widget',
          name: 'CardWithBadge',
          key: getUniqueName('CardWithBadge'),
          id: cardWidgetId,
          params: {
            text: 'Карточка с текстом',
            label: 'и бэйджем',
          },
        },
      ],
      [
        {
          type: 'widget',
          name: 'CardWithBadge',
          key: getUniqueName('CardWithBadge'),
          id: cardWidgetId,
          params: {
            text: 'Карточка с текстом',
            label: 'и бэйджем',
          },
        },
      ],
    ],
  },
]

storiesOf('dashboard/Box', module)
  .addDecorator(withSmartKnobs)
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
