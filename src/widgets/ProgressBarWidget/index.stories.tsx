import React from 'react'

import { object } from '@storybook/addon-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { defaultParams, ProgressBarWidget, ProgressBarWidgetContent } from './'

export const Interactive = createStory(() => (
  <ProgressBarWidgetContent
    data={object('data', ProgressBarWidget.mockData)}
    params={object('params', defaultParams)}
  />
))

export default createMetadata({
  title: 'widgets/ProgressBarWidget',
  decorators: [blockCenteringDecorator({ width: 300, height: 300 })],
})
