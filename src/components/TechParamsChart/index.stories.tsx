import React from 'react'

import { select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { statuses, TechParamsChart } from '.'

const getRandomArray = () =>
  [...new Array(100)].map(() => {
    return Math.random()
  })

storiesOf('components/TechParamsChart', module)
  .addDecorator(blockCenteringDecorator({ display: 'flex', height: 620, width: 161 }))
  .add('interactive', () => (
    <TechParamsChart
      status={select('Status', statuses, statuses[0])}
      id="test-chart"
      mainChartData={getRandomArray()}
      additionalChartData={getRandomArray()}
      dataRange={{
        lowerDanger: -7.9,
        lowerWarning: -7.9,
        maximum: 159,
        minimum: -7.9,
        upperDanger: 159,
        upperWarning: 159,
        originalLowerDanger: 200,
        originalLowerWarning: 0,
        originalUpperWarning: 0,
        originalUpperDanger: 0,
      }}
    />
  ))
