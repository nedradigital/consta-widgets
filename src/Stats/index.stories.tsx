import React from 'react'

import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory } from '@/common/storybook'

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

export const WithLineBreak = createStory(
  () => (
    <Stats
      title="Сроки срочные сроки срочные сроки срочные"
      value={217000}
      badge={{
        percentage: 2.1,
        status: 'normal',
      }}
      unit="суток / час / суток / час / суток / час"
      size="xs"
      layout="full"
    />
  ),
  { name: 'с переносом строки' }
)

export default createMetadata({
  title: 'components/Stats',
  decorators: [withSmartKnobs()],
  parameters: {
    environment: {
      style: {
        width: 200,
      },
    },
  },
})
