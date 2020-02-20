import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { noop } from 'lodash'

import { Box } from '@/dashboard/components/Box'
import { BoxItem } from '@/dashboard/types'
import { getUniqueName } from '@/utils/uniq-name-hook'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, ImagesWidget, ImagesWidgetContent, widgetId } from '.'

storiesOf('widgets/ImagesWidget', module)
  .addDecorator(blockCenteringDecorator({ width: '30vw' }))
  .add('interactive', () => (
    <ImagesWidgetContent
      data={object('data', ImagesWidget.mockData)}
      params={object('params', defaultParams)}
    />
  ))

storiesOf('widgets/ImagesWidget', module)
  .addDecorator(blockCenteringDecorator({ width: 200 }))
  .add('in a box', () => {
    const id = getUniqueName('ImagesWidget')
    const items: readonly BoxItem[] = [
      {
        type: 'widget',
        debugName: 'ImagesWidget',
        id,
        widgetType: widgetId,
        params: defaultParams,
      },
    ]

    return (
      <DndProvider backend={HTML5Backend}>
        <Box
          viewMode
          items={items}
          onChange={noop}
          data={{
            [id]: object('data', ImagesWidget.mockData),
          }}
          datasets={[]}
        />
      </DndProvider>
    )
  })
