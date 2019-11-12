import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { sizes, Stats } from './index'

storiesOf('components/Stats', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <Stats
      size={sizes[0]}
      statusBadge={'normal'}
      top={'Сроки'}
      right={'суток'}
      bottom={'+2.1%'}
      number={'+217'}
    />
  ))
