import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { WellKPI } from '.'

storiesOf('legacy/Well/KPI', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: 600 }))
  .add('interactive', () => (
    <WellKPI
      className={'.testClass'}
      factCost={100}
      progress={100}
      currentDay={10}
      planDaysCount={100}
      debit={42}
      specificDrillingTime={42}
    />
  ))
