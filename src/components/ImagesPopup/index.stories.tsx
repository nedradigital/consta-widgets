import React from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { ImagesPopup } from '.'

storiesOf('components/ImagesPopup', module)
  .addDecorator(withSmartKnobs())
  .add('interactive', () => (
    <ImagesPopup
      isVisible
      images={[
        { large: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg' },
        { preview: 'https://via.placeholder.com/150', large: 'https://via.placeholder.com/1500' },
        { large: 'https://via.placeholder.com/400x200' },
        { large: 'https://via.placeholder.com/200x400' },
      ]}
      activeImage={1}
      onRequestClose={action('onRequestClose')}
    />
  ))
