import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { ImagesList } from '.'

storiesOf('components/ImagesList', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '20vw' }))
  .add('interactive', () => (
    <ImagesList
      images={[
        { large: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg' },
        { preview: 'https://via.placeholder.com/150', large: 'https://via.placeholder.com/1500' },
        { large: 'https://via.placeholder.com/400x200' },
        { large: 'https://via.placeholder.com/200x400' },
      ]}
    />
  ))
