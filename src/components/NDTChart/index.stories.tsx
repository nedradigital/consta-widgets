import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { NDTChart } from '.'

storiesOf('components/NDT/Chart', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => <NDTChart />)
