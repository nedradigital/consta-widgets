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

const getGridConfig = () =>
  object('gridConfig', {
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
  } as const)

const getCommonProps = () => {
  const now = Date.now()
  const unit = text('unit', 'тыс м3')
  const valueMapper = (y: number, x: number) => ({
    x: now + x * 1000 * 60 * 60 * 24,
    y,
  })

  return {
    lines: [
      {
        colorGroupName: 'first',
        values: getArrayWithRandomInt(MIN, MAX, COUNT_POINTS - 1).map(valueMapper),
        dots: true,
        lineName: 'Северный бур',
      },
      {
        colorGroupName: 'second',
        values: getArrayWithRandomInt(MIN, MAX, COUNT_POINTS).map(valueMapper),
        lineName: 'Южное месторождение',
      },
    ],
    threshold: object('threshold', {
      max: {
        values: getArrayWithRandomInt(MIN, MAX, COUNT_POINTS).map((_, x) => valueMapper(6, x)),
      },
      min: {
        values: getArrayWithRandomInt(MIN, MAX, COUNT_POINTS).map((_, x) => valueMapper(1, x)),
      },
    }),
    gridConfig: getGridConfig(),
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
    return (
      <LinearChart
        {...getCommonProps()}
        colorGroups={object('colorGroups', colorGroups)}
        isHorizontal
      />
    )
  })
  .add('с пропусками', () => {
    return (
      <LinearChart
        colorGroups={colorGroups}
        lines={[
          {
            colorGroupName: 'first',
            values: [
              { x: 0, y: null },
              { x: 1, y: 1 },
              { x: 2, y: 0 },
              { x: 3, y: null },
              { x: 4, y: null },
              { x: 5, y: 3 },
              { x: 6, y: null },
              { x: 7, y: 1 },
              { x: 8, y: 2 },
              { x: 9, y: null },
            ],
            dots: true,
            lineName: 'Северный бур',
          },
        ]}
        gridConfig={getGridConfig()}
        formatValueForLabel={String}
        isHorizontal
        withZoom
      />
    )
  })

storiesOf('components/LinearChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: 300, height: '80vh' }))
  .add('vertical', () => {
    return (
      <LinearChart
        {...getCommonProps()}
        colorGroups={object('colorGroups', colorGroups)}
        isHorizontal={false}
      />
    )
  })
