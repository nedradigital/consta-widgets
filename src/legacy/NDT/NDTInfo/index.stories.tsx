import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { NDTInfo } from '.'

storiesOf('legacy/NDT/Info', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '189px' }))
  .add('interactive', () => <NDTInfo />)
