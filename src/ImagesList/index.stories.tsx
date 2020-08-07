import React from 'react'

import { action } from '@storybook/addon-actions'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory } from '@/_private/storybook'

import { ImagesList } from '.'

export const Interactive = createStory(() => (
  <ImagesList
    images={[
      { large: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg' },
      { preview: 'https://via.placeholder.com/150', large: 'https://via.placeholder.com/1500' },
      { large: 'https://via.placeholder.com/400x200' },
      { large: 'https://via.placeholder.com/200x400' },
    ]}
    onClick={action('onClick')}
  />
))

export default createMetadata({
  title: 'components/ImagesList',
  decorators: [withSmartKnobs()],
  parameters: {
    environment: {
      style: {
        width: '20vw',
      },
    },
  },
})
