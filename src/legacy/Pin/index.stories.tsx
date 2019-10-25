import React from 'react'

import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Pin } from '.'

storiesOf('legacy/Pin', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <Pin title={'1540 м'}>{text('children', 'Высокий риск обвала породы')}</Pin>
  ))
