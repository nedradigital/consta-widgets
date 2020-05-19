import React from 'react'

import { text } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { Badge } from '.'

export const Interactive = createStory(() => (
  <Badge wpSize="s" view="filled" status="normal">
    {text('children', '+4.8%')}
  </Badge>
))

export default createMetadata({
  title: 'components/Badge',
  decorators: [withSmartKnobs({ ignoreProps: ['withIcon', 'icon'] }), blockCenteringDecorator()],
})
