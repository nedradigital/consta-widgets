import React from 'react'

import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { NDTInfo } from '.'

storiesOf('components/NDT/Info', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator({ width: '189px' }))
  .add('interactive', () => <NDTInfo />)
