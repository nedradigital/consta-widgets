import React from 'react'

import { object } from '@storybook/addon-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { defaultParams, LegendWidget, LegendWidgetContent } from '.'

export const Interactive = createStory(() => (
  <LegendWidgetContent
    data={object('data', LegendWidget.mockData)}
    params={object('params', defaultParams)}
  />
))

export default createMetadata({
  title: 'widgets/LegendWidget',
  decorators: [blockCenteringDecorator()],
})
