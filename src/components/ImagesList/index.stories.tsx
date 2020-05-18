import React from 'react'

import { action } from '@storybook/addon-actions'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { ImagesList } from '.'

export const Interactive = createStory(() => (
  <ImagesList images={getWidgetMockData(DataType.Images)} onClick={action('onClick')} />
))

export default createMetadata({
  title: 'components/ImagesList',
  decorators: [withSmartKnobs(), blockCenteringDecorator({ width: '20vw' })],
})
