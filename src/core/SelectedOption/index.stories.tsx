import React from 'react'

import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'

import { createMetadata, createStory, environmentDecorator } from '@/common/storybook'

import { SelectedOption } from '.'

export const Interactive = createStory(() => (
  <SelectedOption name={text('name', 'Без нарушений')} onRemove={action('onRemove')} />
))

export default createMetadata({
  title: 'core/SelectedOption',
  decorators: [environmentDecorator()],
})
