import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

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
]

storiesOf('components/Cost/CostChart', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => <CostChart currentDay={0} daysSummary={summary} />)
