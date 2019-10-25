import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { HorizontalBarChart, LineProps } from '.'

const data: readonly LineProps[] = [
  {
    title: 'Геонавигация',
    percent: 100,
    value: 70,
  },
  {
    title: 'Инжиниринг',
    percent: 65,
    value: 60,
  },
  {
    title: 'Геомеханика',
    percent: 40,
    value: 50,
  },
]

storiesOf('components/HorizontalBarChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: 600 }))
  .add('interactive', () => <HorizontalBarChart data={data} />)
