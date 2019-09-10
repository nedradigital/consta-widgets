import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { boolean, number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { GridLines } from '@/components/GridLines'
import { HorizontalTicks } from '@/components/HorizontalTicks'
import { VerticalTicks } from '@/components/VerticalTicks'
import { getArrayWithRandomInt } from '@/utils/array'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { LinearChart } from '.'

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
  minValue: 50,
  maxValue: 90,
  lines: [
    {
      values: getArrayWithRandomInt(85, 90, size),
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
      values: getArrayWithRandomInt(60, 80, size),
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

storiesOf('components/LinearChart', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '50vh' }))
  .add('interactive', () => {
    const showHorizontalScale = boolean('Show horizontal scale:', true)
    const showVerticalScale = boolean('Show vertical scale:', true)
    const showGridLines = boolean('Show grid lines:', true)
    const gridColumns = showGridLines ? number('Grid columns count:', 12) : 0
    const gridRows = showGridLines ? number('Grid rows count:', 0) : 0

    return (
      <LinearChart
        {...props}
        valuePadding={[0.3, 0.1]}
        legend={legend}
        renderHorizontalScale={
          showHorizontalScale
            ? () => (
                <HorizontalTicks
                  labels={['янв', '', '', 'апр', '', '', 'июл', '', '', 'окт', '', '', '']}
                  marginTop={8}
                />
              )
            : undefined
        }
        renderVerticalScale={
          showVerticalScale
            ? ({ minValue, maxValue }) => (
                <VerticalTicks
                  minValue={minValue}
                  maxValue={maxValue}
                  ticks={5}
                  precision={2}
                  marginLeft={8}
                />
              )
            : undefined
        }
        renderGridLines={
          showGridLines ? () => <GridLines columns={gridColumns} rows={gridRows} /> : undefined
        }
      />
    )
  })
  .add('naked', () => (
    <LinearChart
      {...props}
      lines={props.lines.map(line => ({ ...line, hint: false }))}
      unitName={undefined}
    />
  ))
