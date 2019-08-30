import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Chart } from '.'

const size = 12 * 4

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

const dataBackground = [...new Array(size)].map(() => {
  return getRandomInt(85, 90)
})

const dataForeground = [...new Array(size)].map(() => {
  return getRandomInt(60, 80)
})

const legend = [
  {
    name: 'Всего в разработке',
    value: 80,
  },
  {
    name: 'На сопровождении ЦУБ',
    value: 77,
  },
]

const props = {
  labels: {
    x: ['янв', '', '', 'апр', '', '', 'июл', '', '', 'окт', '', ''],
    y: ['50', '60', '70', '80', '90'].reverse(),
  },
  minValue: 50,
  maxValue: 90,
  lines: [
    {
      value: dataBackground,
      background: true,
      circle: true,
    },
    {
      value: dataForeground,
      circle: true,
    },
  ],
  unitName: 'шт',
}

storiesOf('components/Chart', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: 600 }))
  .add('interactive', () => <Chart {...props} legend={legend} />)
  .add('without legend', () => <Chart {...props} />)
