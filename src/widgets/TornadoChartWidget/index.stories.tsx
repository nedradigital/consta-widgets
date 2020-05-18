import React from 'react'

import { object } from '@storybook/addon-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { defaultParams, TornadoChartContent, TornadoChartWidget } from '.'

export const Interactive = createStory(() => (
  <TornadoChartContent
    data={object('data', TornadoChartWidget.mockData)}
    params={object('params', defaultParams)}
  />
))

export default createMetadata({
  title: 'widgets/TornadoChartWidget',
  decorators: [blockCenteringDecorator({ width: '60vw', height: '80vh' })],
})
