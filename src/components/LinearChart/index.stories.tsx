import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { LinearChart } from '.'

const getCommonProps = () => ({
  lines: [
    {
      color: '#20B55F',
      values: [
        { x: 0, y: -1 },
        { x: 1, y: 3 },
        { x: 2, y: 1 },
        { x: 3, y: 4 },
        { x: 4, y: 2 },
        { x: 5, y: -4 },
        { x: 6, y: 5 },
      ],
      dots: true,
    },
    {
      color: '#56B9F2',
      values: [
        { x: 0, y: -2 },
        { x: 1, y: 4 },
        { x: 2, y: 0 },
        { x: 3, y: 5 },
        { x: 4, y: 3 },
        { x: 5, y: 4 },
        { x: 6, y: -1 },
      ],
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
})

storiesOf('components/LinearChart', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '50vh' }))
  .add('horizontal', () => {
    return <LinearChart {...getCommonProps()} />
  })

storiesOf('components/LinearChart', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: 300, height: '80vh' }))
  .add('vertical', () => {
    return <LinearChart {...getCommonProps()} isVertical />
  })
