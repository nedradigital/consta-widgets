import React from 'react'

import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { Stats } from './index'

export const Interactive = createStory(() => (
  <Stats
    title="Сроки"
    value={217}
    badge={{
      percentage: 2.1,
      status: 'normal',
    }}
    unit="суток"
    size="xs"
    layout="full"
  />
))

export default createMetadata({
  title: 'components/Stats',
  decorators: [withSmartKnobs(), blockCenteringDecorator()],
})
