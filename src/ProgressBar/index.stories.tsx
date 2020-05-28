import React from 'react'

import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/common/storybook'

import { ProgressBar } from './'
import { progressBarData, progressBarDataWithNullValue } from './data.mock'

export const Interactive = createStory(() => <ProgressBar size="m" {...progressBarData} />)

export const WithoutData = createStory(
  () => <ProgressBar size="m" {...progressBarDataWithNullValue} />,
  {
    name: 'без данных',
  }
)

export default createMetadata({
  title: 'components/ProgressBar',
  decorators: [withSmartKnobs(), blockCenteringDecorator({ width: 300, height: 300 })],
})
