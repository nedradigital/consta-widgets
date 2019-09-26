import React from 'react'

import { number, object, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { getArrayWithRandomInt } from '@/utils/array'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { VerticalGraph } from '.'

storiesOf('legacy/VerticalGraph', module)
  .addDecorator(blockCenteringDecorator({ width: 175, height: 240 }))
  .add('interactive', () => (
    <VerticalGraph
      params={{ title: text('title', 'TVD') }}
      data={{
        values: object('data.values', [0, 100, ...getArrayWithRandomInt(100, 500, 5), 100, 0]),
        from: number('data.from', 1769),
        to: number('data.to', 6742),
      }}
    />
  ))
