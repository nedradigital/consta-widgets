import React from 'react'

import { getArrayWithRandomInt } from '@gaz/utils/lib/array'
import { object, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { LinearChart } from '.'

const MIN = -2
const MAX = 8
const COUNT_POINTS = 51

const colorGroups = {
  first: '#20B55F',
  second: '#56B9F2',
}

const getCommonProps = () => {
  const unit = text('unit', 'тыс м3')

  return {
    lines: [
      {
        colorGroupName: 'first',
        values: getArrayWithRandomInt(MIN, MAX, COUNT_POINTS).map((y, x) => ({
          x: Date.now() + x,
          y,
        })),
        dots: true,
        lineName: 'Северный бур',
      },
      {
        colorGroupName: 'second',
        values: getArrayWithRandomInt(MIN, MAX, COUNT_POINTS - 1).map((y, x) => ({
          x: Date.now() + x,
          y,
        })),
        lineName: 'Южное месторождение',
      },
    ],
    threshold: object('threshold', {
      max: getArrayWithRandomInt(MIN, MAX, COUNT_POINTS).map((_, x) => ({
        x: Date.now() + x,
        y: 6,
      })),
      min: getArrayWithRandomInt(MIN, MAX, COUNT_POINTS).map((_, x) => ({
        x: Date.now() + x,
        y: 1,
      })),
    }),
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
    formatValueForLabel: (v: number) => new Date(v).toLocaleDateString(),
    foematValueForTooltip: (v: number) => `${v} ${unit}`,
    formatValueForTooltipTitle: (v: number) => {
      const title = new Date(v)
        .toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
        .replace('г.', '')

      return title[0].toUpperCase() + title.slice(1)
    },
    unit,
  }
}

storiesOf('components/LinearChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '50vh' }))
  .add('horizontal', () => {
    return <LinearChart {...getCommonProps()} colorGroups={object('colorGroups', colorGroups)} />
  })

storiesOf('components/LinearChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: 300, height: '80vh' }))
  .add('vertical', () => {
    return (
      <LinearChart
        {...getCommonProps()}
        colorGroups={object('colorGroups', colorGroups)}
        isVertical
      />
    )
  })
