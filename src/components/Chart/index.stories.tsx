import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { getArrayWithRandomInt } from '@/utils/array'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { Chart } from '.'

const size = 12 * 4

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
      value: getArrayWithRandomInt(85, 90, size),
      background: true,
      circle: true,
      hint: true,
      colors: {
        line: '#29b0ff',
        background: {
          start: 'rgba(41, 176, 255, 0.4)',
        },
      },
    },
    {
      value: getArrayWithRandomInt(60, 80, size),
      circle: true,
      colors: {
        line: '#1c9c52',
        background: {
          start: 'rgba(28, 156, 82, 0.4)',
        },
      },
    },
  ],
  unitName: 'шт',
}

storiesOf('components/Chart', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: 600 }))
  .add('interactive', () => <Chart {...props} legend={legend} />)
  .add('without legend', () => <Chart {...props} />)
