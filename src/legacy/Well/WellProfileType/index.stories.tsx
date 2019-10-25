import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { WellProfileType } from '.'

storiesOf('legacy/Well/ProfileType', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: 324 }))
  .add('interactive', () => (
    <WellProfileType
      erd={42}
      objectiveName={'test objective name'}
      taml={100}
      wellTypeName={'test type name'}
    />
  ))
