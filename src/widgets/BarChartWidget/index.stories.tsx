import React from 'react'

import { object } from '@storybook/addon-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { BarChartWidget, BarChartWidgetContent, defaultParams } from '.'

export const Interactive = createStory(() => (
  <BarChartWidgetContent
    data={object('data', BarChartWidget.mockData)}
    params={object('params', defaultParams)}
  />
))

export default createMetadata({
  title: 'widgets/BarChartWidget',
  decorators: [blockCenteringDecorator({ width: '60vw', height: '80vh' })],
})
