import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { NDTTable } from '.'

storiesOf('legacy/NDT/Table', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '189px' }))
  .add('interactive', () => <NDTTable />)
