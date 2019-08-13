import React from 'react'

import { number, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { CostInfo } from '.'

storiesOf('components/Cost/CostInfo', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator({ width: 180 }))
  .add('interactive', () => (
    <CostInfo
      factCost={number('factCost', 95600000)}
      planCost={number('planCost', 102000000)}
      costDeviation={number('costDeviation', 3000000)}
      percentCostDeviation={number('percentCostDeviation', 5, {
        range: true,
        min: 1,
        max: 100,
        step: 1,
      })}
    />
  ))
