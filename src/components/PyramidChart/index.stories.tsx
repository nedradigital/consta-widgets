import React from 'react'

import { boolean } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { DEFAULT_COLORS, PyramidChart } from './index'

export const Interactive = createStory(() => (
  <PyramidChart
    data={getWidgetMockData(DataType.Pyramid)}
    colors={DEFAULT_COLORS}
    constraint={boolean('constraint', true)}
    fontSize="m"
  />
))

export default createMetadata({
  title: 'components/PyramidChart',
  decorators: [withSmartKnobs(), blockCenteringDecorator({ width: '50vw' })],
})
