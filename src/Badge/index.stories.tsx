import React from 'react'

import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory, environmentDecorator } from '@/common/storybook'

import { Badge } from '.'

export const Interactive = createStory(() => (
  <Badge label="+4.8%" size="s" view="filled" status="normal" />
))

export default createMetadata({
  title: 'components/Badge',
  decorators: [withSmartKnobs({ ignoreProps: ['withIcon', 'icon'] }), environmentDecorator()],
})
