import React from 'react'

import { number } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/common/utils/Storybook'

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
    <div
      style={{
        width: number('Ширина контейнера', 200),
      }}
    >
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
    </div>
  ),
  { name: 'с переносом строки' }
)

export default createMetadata({
  title: 'components/Stats',
  decorators: [withSmartKnobs(), blockCenteringDecorator()],
})
