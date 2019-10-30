import React from 'react'

import { getArrayWithRandomInt } from '@gaz/utils/lib/array'
import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { LinearChart } from '.'

const MIN = -2
const MAX = 8
const COUNT_POINTS = 51

const getCommonProps = () => ({
  lines: [
    {
      color: '#20B55F',
      values: getArrayWithRandomInt(MIN, MAX, COUNT_POINTS).map((y, x) => ({
        x: Date.now() + x,
        y,
      })),
      dots: true,
    },
    {
      color: '#56B9F2',
      values: getArrayWithRandomInt(MIN, MAX, COUNT_POINTS).map((y, x) => ({
        x: Date.now() + x,
        y,
      })),
    },
  ],
  gridConfig: object('gridConfig', {
    x: {
      labels: 'bottom',
      labelTicks: 5,
      gridTicks: 10,
      guide: true,
    },
    y: {
      labels: 'left',
      labelTicks: 4,
      gridTicks: 4,
      guide: true,
    },
  } as const),
  withZoom: true,
  formatLabel: (v: number) => new Date(v).toLocaleDateString(),
})

storiesOf('components/LinearChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '50vh' }))
  .add('horizontal', () => {
    return <LinearChart {...getCommonProps()} />
  })

storiesOf('components/LinearChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: 300, height: '80vh' }))
  .add('vertical', () => {
    return <LinearChart {...getCommonProps()} isVertical />
  })
