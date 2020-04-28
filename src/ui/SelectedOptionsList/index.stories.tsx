import React from 'react'

import { action } from '@storybook/addon-actions'
import { object } from '@storybook/addon-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { SelectedOptionsList } from './'

export const Interactive = createStory(() => (
  <SelectedOptionsList
    values={object('values', [
      { id: '1', name: 'Без нарушений' },
      { id: '2', name: 'С нарушениями' },
    ])}
    onRemove={action('onRemove')}
    onReset={action('onReset', { depth: 0 })}
  />
))

export default createMetadata({
  title: 'ui/SelectedOptionsList',
  decorators: [blockCenteringDecorator({ width: 500 })],
})
