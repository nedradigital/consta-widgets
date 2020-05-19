import React from 'react'

import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { SelectedOption } from './'

export const Interactive = createStory(() => (
  <SelectedOption name={text('name', 'Без нарушений')} onRemove={action('onRemove')} />
))

export default createMetadata({
  title: 'components/SelectedOption',
  decorators: [blockCenteringDecorator()],
})
