import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { TechParamsChart } from '.'

const getRandomArray = () =>
  [...new Array(100)].map(() => {
    return Math.random()
  })

storiesOf('legacy/TechParams/Chart', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ display: 'flex', height: '90vh', width: 161 }))
  .add('interactive', () => (
    <TechParamsChart
      status={'normal'}
      mainChartData={getRandomArray()}
      additionalChartData={getRandomArray()}
      dataRange={object('dataRange', {
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
      })}
    />
  ))
