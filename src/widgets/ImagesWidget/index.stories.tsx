import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { object } from '@storybook/addon-knobs'
import { noop } from 'lodash'

import { BoxItem } from '@/dashboard'
import { Box } from '@/dashboard/components/Box'
import { getUniqueName } from '@/utils/uniq-name-hook'
import { widgetIdsByType } from '@/utils/widgets-list'
import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { defaultParams, ImagesWidget, ImagesWidgetContent } from '.'

export const Interactive = createStory(
  () => (
    <ImagesWidgetContent
      data={object('data', ImagesWidget.mockData)}
      params={object('params', defaultParams)}
    />
  ),
  { decorators: [blockCenteringDecorator({ width: '30vw' })] }
)

export const InABox = createStory(
  () => {
    const id = getUniqueName('ImagesWidget')
    const items: readonly BoxItem[] = [
      {
        type: 'widget',
        debugName: 'ImagesWidget',
        id,
        widgetType: widgetIdsByType.ImagesWidget,
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
  },
  { decorators: [blockCenteringDecorator({ width: 250 })] }
)

export default createMetadata({
  title: 'widgets/ImagesWidget',
})
