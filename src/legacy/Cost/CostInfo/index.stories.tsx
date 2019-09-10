import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { CostInfo } from '.'

storiesOf('legacy/Cost/CostInfo', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: 180 }))
  .add('interactive', () => (
    <CostInfo
      factCost={95600000}
      planCost={102000000}
      costDeviation={3000000}
      percentCostDeviation={number('percentCostDeviation', 5, {
        range: true,
        min: 1,
        max: 100,
        step: 1,
      })}
    />
  ))
