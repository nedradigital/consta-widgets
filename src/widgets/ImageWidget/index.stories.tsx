import React from 'react'

import { object } from '@storybook/addon-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { defaultParams, ImageWidget, ImageWidgetContent } from '.'

export const Interactive = createStory(() => (
  <ImageWidgetContent
    data={object('data', ImageWidget.mockData)}
    params={object('params', defaultParams)}
  />
))

export default createMetadata({
  title: 'widgets/ImageWidget',
  decorators: [
    blockCenteringDecorator({
      width: '600px',
      height: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
  ],
})
