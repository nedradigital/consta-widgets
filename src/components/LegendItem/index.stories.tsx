import React from 'react'

import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { LegendItem } from '.'

export default {
  title: 'components/LegendItem',
  decorators: [withSmartKnobs(), blockCenteringDecorator({ maxWidth: 200 })],
}

export const interactive = () => (
  <LegendItem position="left" fontSize="s" type="dot" color="red">
    Тестовый текст
  </LegendItem>
)
