import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { WellProfileType } from '.'

storiesOf('components/Well/ProfileType', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: 324 }))
  .add('interactive', () => (
    <WellProfileType
      erd={42}
      objectiveName={'test objective name'}
      taml={100}
      wellTypeName={'test type name'}
    />
  ))
