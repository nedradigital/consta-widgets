import React from 'react'

import { object, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { unitPositions } from '@/components/BarChartAxis'
import { DataType } from '@/dashboard/types'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { BarChart } from '.'

const defaultBarChartProps = {
  orientation: 'vertical',
  showValues: false,
  gridTicks: 4,
  valuesTicks: 1,
  unit: 'тыс м3',
} as const

const getUnitPosition = () => select('unitPosition', unitPositions, 'none')

storiesOf('components/BarChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '80vh' }))
  .add('interactive', () => {
    return (
      <BarChart
        data={object('data', getWidgetMockData(DataType.BarChart).data)}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.BarChart).colorGroups)}
        unitPosition={getUnitPosition()}
        {...defaultBarChartProps}
      />
    )
  })
  .add('с пропуском значений', () => {
    return (
      <BarChart
        colorGroups={object('colorGroups', getWidgetMockData(DataType.BarChart).colorGroups)}
        data={[
          {
            label: 'март',
            values: [
              { value: undefined, colorGroupName: 'first' },
              { value: 600, colorGroupName: 'second' },
              { value: 270, colorGroupName: 'third' },
            ],
          },
          {
            label: 'апрель',
            values: [
              { value: 670, colorGroupName: 'first' },
              { value: 1000, colorGroupName: 'second' },
              { value: 1100, colorGroupName: 'third' },
            ],
          },
          {
            label: 'май',
            values: [
              { value: 1200, colorGroupName: 'first' },
              { value: 630, colorGroupName: 'second' },
              { value: undefined, colorGroupName: 'third' },
            ],
          },
        ]}
        unitPosition={getUnitPosition()}
        {...defaultBarChartProps}
      />
    )
  })
  .add('с отрицательными значениями', () => (
    <BarChart
      colorGroups={object('colorGroups', getWidgetMockData(DataType.BarChart).colorGroups)}
      data={[
        {
          label: 'март',
          values: [
            { value: -300, colorGroupName: 'first' },
            { value: 600, colorGroupName: 'second' },
            { value: 270, colorGroupName: 'third' },
          ],
        },
        {
          label: 'апрель',
          values: [
            { value: 670, colorGroupName: 'first' },
            { value: -1000, colorGroupName: 'second' },
            { value: 1100, colorGroupName: 'third' },
          ],
        },
        {
          label: 'май',
          values: [
            { value: -1200, colorGroupName: 'first' },
            { value: 630, colorGroupName: 'second' },
            { value: -200, colorGroupName: 'third' },
          ],
        },
      ]}
      unitPosition={getUnitPosition()}
      {...defaultBarChartProps}
    />
  ))
