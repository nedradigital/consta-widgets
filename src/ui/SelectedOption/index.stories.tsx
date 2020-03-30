import React from 'react'

import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { SelectedOption } from './'

storiesOf('ui/SelectedOption', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <SelectedOption name={text('name', 'Без нарушений')} onRemove={action('onRemove')} />
  ))
