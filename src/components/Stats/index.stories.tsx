import React from 'react'

import { select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { sizes, Stats } from './index'

storiesOf('components/Stats', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <Stats
      size={select('size', sizes, sizes[0])}
      top={text('top', 'Сроки')}
      right={text('right', 'суток')}
      bottom={text('bottom', '+2.1%')}
    >
      {text('number', '+217')}
    </Stats>
  ))
