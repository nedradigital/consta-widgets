import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { getUniqueName } from '@/utils/uniq-name-hook'
import { blockCenteringDecorator } from '@/utils/Storybook'
import {
  defaultParams as cardWithBadgeDefaultParams,
  widgetId as cardWidgetId,
} from '@/widgets/CardWithBadge'
import { defaultParams as textDefaultParams, widgetId as textWidgetId } from '@/widgets/TextWidget'

import { Columns, ColumnsItem } from '.'

const columnsItem: ColumnsItem = {
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
      {
        type: 'widget',
        debugName: 'TitleWidget',
        id: getUniqueName('TitleWidget'),
        widgetType: textWidgetId,
        params: textDefaultParams,
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
}

storiesOf('dashboard/Columns', module)
  .addDecorator(blockCenteringDecorator({ width: 600 }))
  .add('interactive', () => {
    const Wrapper = () => {
      const [config, changeConfig] = React.useState(columnsItem)

      const handler = (columns: ColumnsItem['columns']) => {
        changeConfig({ ...config, columns })
      }

      return (
        <Columns
          viewMode={boolean('viewMode', false)}
          onChange={handler}
          data={{}}
          datasets={[]}
          {...config}
        />
      )
    }

    return (
      <DndProvider backend={HTML5Backend}>
        <Wrapper />
      </DndProvider>
    )
  })
