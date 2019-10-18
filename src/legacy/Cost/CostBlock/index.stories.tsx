import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { CostBlock } from '.'

const planCostTotal = 95600000
const factCostTotal = 102000000
const costDeviationTotal = 3000000
const percentCostDeviation = 5
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

storiesOf('legacy/Cost/CostBlock', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '90%', height: '60vh' }))
  .add('interactive', () => <CostBlock currentDay={1} daysSummary={summary} />)
