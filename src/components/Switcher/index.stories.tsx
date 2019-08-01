import React from 'react'

import { action } from '@storybook/addon-actions'
import { boolean, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Switcher } from '.'

storiesOf('components/Switcher', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <Switcher
      isEnabled={boolean('isEnabled', false)}
      title={text('title', 'Абсолют.')}
      onClick={action('click')}
    />
  ))
