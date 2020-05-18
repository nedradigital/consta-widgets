import React from 'react'

import { object } from '@storybook/addon-knobs'

import {
  blockCenteringDecorator,
  createMetadata,
  createStory,
  cubeMeterFormatValue,
} from '@/utils/Storybook'

import { defaultParams, RadarChartWidget, RadarChartWidgetContent } from '.'

export const Interactive = createStory(() => (
  <RadarChartWidgetContent
    data={{
      ...object('data', RadarChartWidget.mockData),
      formatValueForTooltip: cubeMeterFormatValue,
    }}
    params={object('params', defaultParams)}
  />
))

export default createMetadata({
  title: 'widgets/RadarChartWidget',
  decorators: [blockCenteringDecorator({ width: '80vw', height: '80vh' })],
})
