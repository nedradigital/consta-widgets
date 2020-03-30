import React from 'react'

import { action } from '@storybook/addon-actions'
import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { SelectedOptionsList } from './'

storiesOf('ui/SelectedOptionsList', module)
  .addDecorator(blockCenteringDecorator({ width: 500 }))
  .add('interactive', () => (
    <SelectedOptionsList
      values={object('values', [
        { id: '1', name: 'Без нарушений' },
        { id: '2', name: 'С нарушениями' },
      ])}
      onRemove={action('onRemove')}
      onReset={action('onReset', { depth: 0 })}
    />
  ))
