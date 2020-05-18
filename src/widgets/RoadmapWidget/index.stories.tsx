import React from 'react'

import { object } from '@storybook/addon-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { defaultParams, RoadmapWidget, RoadmapWidgetContent } from '.'

export const Interactive = createStory(() => (
  <RoadmapWidgetContent data={object('data', RoadmapWidget.mockData)} params={defaultParams} />
))

export const MultipleRoadmap = createStory(() => (
  <RoadmapWidgetContent
    data={object('data', RoadmapWidget.mockData.concat(RoadmapWidget.mockData))}
    params={object('params', defaultParams)}
  />
))

export default createMetadata({
  title: 'widgets/RoadmapWidget',
  decorators: [blockCenteringDecorator({ width: '100vw' })],
})
