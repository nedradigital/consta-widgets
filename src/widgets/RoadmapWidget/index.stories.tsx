import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, RoadmapWidget, RoadmapWidgetContent } from '.'

storiesOf('widgets/RoadmapWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <RoadmapWidgetContent data={object('data', RoadmapWidget.mockData)} params={defaultParams} />
  ))
  .add('multiple roadmap', () => (
    <RoadmapWidgetContent
      data={object('data', RoadmapWidget.mockData.concat(RoadmapWidget.mockData))}
      params={object('params', defaultParams)}
    />
  ))
