import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { CostChart } from '.'

const planCostTotal = 300
const factCostTotal = 450
const costDeviationTotal = 0
const percentCostDeviation = 0
const data = {
  planCostTotal,
  factCostTotal,
  costDeviationTotal,
  percentCostDeviation,
}

const summary = [
  {
    planCost: 200,
    factCost: 100,
    ...data,
  },
  {
    planCost: 600,
    factCost: 300,
    ...data,
  },
  {
    planCost: 400,
    factCost: 200,
    ...data,
  },
  {
    planCost: 1500,
    factCost: 1200,
    ...data,
  },
  {
    planCost: 50,
    factCost: 10,
    ...data,
  },
] as const

storiesOf('legacy/Cost/CostChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '60vh' }))
  .add('interactive', () => <CostChart currentDay={0} daysSummary={summary} />)
